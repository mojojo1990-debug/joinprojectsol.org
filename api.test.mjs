import test from 'node:test';
import assert from 'node:assert/strict';
import handler from '../api/chat.mjs';

function request(body, origin = 'https://joinprojectsol.org') {
  return new Request('https://joinprojectsol.org/api/chat', {
    method: 'POST',
    headers: { 'content-type': 'application/json', origin, 'x-forwarded-for': `test-${Math.random()}` },
    body: JSON.stringify(body),
  });
}

test('rejects empty messages', async () => {
  process.env.OPENAI_API_KEY = 'test-key';
  const response = await handler.fetch(request({ message: '' }));
  assert.equal(response.status, 400);
});

test('rejects unapproved origins', async () => {
  process.env.OPENAI_API_KEY = 'test-key';
  const response = await handler.fetch(request({ message: 'Hello' }, 'https://evil.example'));
  assert.equal(response.status, 403);
});

test('returns a live AI reply and response id', async () => {
  process.env.OPENAI_API_KEY = 'test-key';
  const originalFetch = globalThis.fetch;
  globalThis.fetch = async url => {
    if (String(url).endsWith('/moderations')) {
      return Response.json({ results: [{ flagged: false }] });
    }
    if (String(url).endsWith('/responses')) {
      return Response.json({ id: 'resp_test123', model: 'gpt-5-mini', output: [{ content: [{ type: 'output_text', text: 'Let’s build the first step.' }] }] });
    }
    throw new Error('unexpected URL');
  };
  try {
    const response = await handler.fetch(request({ message: 'Help me build an app.' }));
    const data = await response.json();
    assert.equal(response.status, 200);
    assert.equal(data.reply, 'Let’s build the first step.');
    assert.equal(data.responseId, 'resp_test123');
  } finally {
    globalThis.fetch = originalFetch;
  }
});

test('blocks moderated content before generation', async () => {
  process.env.OPENAI_API_KEY = 'test-key';
  const originalFetch = globalThis.fetch;
  globalThis.fetch = async url => {
    if (String(url).endsWith('/moderations')) return Response.json({ results: [{ flagged: true }] });
    throw new Error('generation should not be called');
  };
  try {
    const response = await handler.fetch(request({ message: 'unsafe test input' }));
    assert.equal(response.status, 400);
    const data = await response.json();
    assert.equal(data.code, 'moderated');
  } finally {
    globalThis.fetch = originalFetch;
  }
});

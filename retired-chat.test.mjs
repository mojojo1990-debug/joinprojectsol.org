import test from 'node:test';
import assert from 'node:assert/strict';
import { existsSync, readFileSync } from 'node:fs';

const file = name => new URL(name, import.meta.url);
const read = name => readFileSync(file(name), 'utf8');

test('retired live-chat service and launch files are absent', () => {
  const retired = [
    'chat.mjs', 'api.test.mjs', 'assets/app.js',
    'LAUNCH.html', 'LAUNCH_CHECKLIST.md', 'VERIFIED-TEST-REPORT.txt',
    'vercel.json', 'README.txt'
  ];
  for (const path of retired) assert.equal(existsSync(file(path)), false, path);
});

test('active static website does not call a chat API', () => {
  for (const path of ['index.html', 'app.js', 'service-worker.js']) {
    const content = read(path);
    assert.doesNotMatch(content, /\/api\/chat|OPENAI_API_KEY|OPENAI_MODEL|\/v1\/responses|\/v1\/moderations/i, path);
  }
  assert.match(read('index.html'), /id="idea-form"/);
  assert.match(read('index.html'), /id="lang-toggle"/);
  assert.match(read('app.js'), /const stepPlans\s*=/);
});

test('static checks have no server or chatbot dependencies', () => {
  const pkg = JSON.parse(read('package.json'));
  assert.equal(pkg.name, 'joinprojectsol-community-website');
  assert.doesNotMatch(pkg.scripts.check + pkg.scripts.test, /chat\.mjs|api\.test|vercel|OPENAI/i);
  assert.doesNotMatch(read('README.md'), /paste.+API key|deploy.+live AI/i);
});

(() => {
  'use strict';

  const form = document.querySelector('#conversationForm');
  const prompt = document.querySelector('#prompt');
  const honeypot = document.querySelector('#website');
  const characterCount = document.querySelector('#characterCount');
  const transcript = document.querySelector('#chatTranscript');
  const sendButton = document.querySelector('#sendButton');
  const newChatButton = document.querySelector('#newChatButton');
  const voiceButton = document.querySelector('#voiceButton');
  const voiceNote = document.querySelector('#voiceNote');
  const speakReplies = document.querySelector('#speakReplies');
  const menuButton = document.querySelector('#menuButton');
  const siteNav = document.querySelector('#siteNav');
  const appStatus = document.querySelector('#appStatus');
  const STORAGE_KEY = 'project-sol-chat-draft';
  const SPEAK_KEY = 'project-sol-speak-replies';

  let conversationHistory = [];
  let requestController = null;

  const safeGet = key => {
    try { return window.localStorage.getItem(key) || ''; } catch { return ''; }
  };
  const safeSet = (key, value) => {
    try { window.localStorage.setItem(key, value); } catch { /* unavailable */ }
  };
  const safeRemove = key => {
    try { window.localStorage.removeItem(key); } catch { /* unavailable */ }
  };

  function updateCount() {
    characterCount.textContent = `${prompt.value.length} / 4000`;
    safeSet(STORAGE_KEY, prompt.value);
  }

  function setBusy(busy) {
    sendButton.disabled = busy;
    voiceButton.disabled = busy || voiceButton.dataset.unsupported === 'true';
    sendButton.textContent = busy ? 'SOL is thinking…' : 'Send';
    form.setAttribute('aria-busy', String(busy));
  }

  function scrollTranscript() {
    transcript.scrollTo({
      top: transcript.scrollHeight,
      behavior: window.matchMedia('(prefers-reduced-motion: reduce)').matches ? 'auto' : 'smooth',
    });
  }

  function addMessage(role, text, options = {}) {
    const article = document.createElement('article');
    article.className = `message message-${role}`;
    const avatar = document.createElement('div');
    avatar.className = 'message-avatar';
    avatar.setAttribute('aria-hidden', 'true');
    avatar.textContent = role === 'sol' ? 'SOL' : 'YOU';
    const bubble = document.createElement('div');
    bubble.className = 'message-bubble';
    const paragraph = document.createElement('p');
    paragraph.textContent = text;
    bubble.appendChild(paragraph);
    article.append(avatar, bubble);
    if (options.pending) article.dataset.pending = 'true';
    transcript.appendChild(article);
    scrollTranscript();
    return article;
  }

  function speak(text) {
    if (!speakReplies.checked || !('speechSynthesis' in window)) return;
    window.speechSynthesis.cancel();
    const utterance = new SpeechSynthesisUtterance(text);
    utterance.rate = 0.96;
    utterance.pitch = 1.02;
    window.speechSynthesis.speak(utterance);
  }

  async function sendMessage(message) {
    setBusy(true);
    addMessage('user', message);
    const pending = addMessage('sol', 'Thinking…', { pending: true });
    safeRemove(STORAGE_KEY);
    prompt.value = '';
    updateCount();

    requestController = new AbortController();
    const timeout = window.setTimeout(() => requestController.abort(), 45000);

    try {
      const response = await fetch('/api/chat', {
        method: 'POST',
        headers: { 'content-type': 'application/json' },
        body: JSON.stringify({
          message,
          history: conversationHistory.slice(-12),
          website: honeypot.value,
        }),
        signal: requestController.signal,
      });
      const data = await response.json().catch(() => ({}));
      if (!response.ok) throw new Error(data.error || 'SOL could not respond this time.');

      pending.querySelector('p').textContent = data.reply;
      pending.removeAttribute('data-pending');
      conversationHistory.push({ role: 'user', content: message }, { role: 'assistant', content: data.reply });
      conversationHistory = conversationHistory.slice(-12);
      if (appStatus) appStatus.textContent = 'SOL replied.';
      speak(data.reply);
    } catch (error) {
      const messageText = error.name === 'AbortError'
        ? 'The response took too long. Check your connection and try again.'
        : (error.message || 'The live AI connection failed. Please try again.');
      pending.querySelector('p').textContent = messageText;
      pending.classList.add('message-error');
      pending.removeAttribute('data-pending');
      if (appStatus) appStatus.textContent = messageText;
    } finally {
      window.clearTimeout(timeout);
      requestController = null;
      setBusy(false);
      prompt.focus();
      scrollTranscript();
    }
  }

  form.addEventListener('submit', event => {
    event.preventDefault();
    const value = prompt.value.trim();
    if (!value) {
      prompt.setCustomValidity('Tell SOL what is on your mind.');
      prompt.reportValidity();
      prompt.setCustomValidity('');
      prompt.focus();
      return;
    }
    sendMessage(value);
  });

  prompt.addEventListener('input', updateCount);
  prompt.addEventListener('keydown', event => {
    if (event.key === 'Enter' && !event.shiftKey && !event.isComposing) {
      event.preventDefault();
      form.requestSubmit();
    }
  });

  newChatButton.addEventListener('click', () => {
    if (requestController) requestController.abort();
    conversationHistory = [];
    window.speechSynthesis?.cancel();
    transcript.innerHTML = '';
    const welcome = document.createElement('article');
    welcome.className = 'message message-sol';
    welcome.innerHTML = '<div class="message-avatar" aria-hidden="true">SOL</div><div class="message-bubble"><strong>Fresh start.</strong><p>What are we building now?</p></div>';
    transcript.appendChild(welcome);
    prompt.value = '';
    updateCount();
    prompt.focus();
    if (appStatus) appStatus.textContent = 'New conversation started.';
  });

  speakReplies.checked = safeGet(SPEAK_KEY) === 'true';
  speakReplies.addEventListener('change', () => {
    safeSet(SPEAK_KEY, String(speakReplies.checked));
    if (!speakReplies.checked) window.speechSynthesis?.cancel();
  });

  menuButton.addEventListener('click', () => {
    const open = siteNav.classList.toggle('open');
    menuButton.setAttribute('aria-expanded', String(open));
  });
  document.addEventListener('keydown', event => {
    if (event.key === 'Escape' && siteNav.classList.contains('open')) {
      siteNav.classList.remove('open');
      menuButton.setAttribute('aria-expanded', 'false');
      menuButton.focus();
    }
  });
  document.addEventListener('click', event => {
    if (!event.target.closest('.nav-wrap') && siteNav.classList.contains('open')) {
      siteNav.classList.remove('open');
      menuButton.setAttribute('aria-expanded', 'false');
    }
  });
  siteNav.addEventListener('click', event => {
    if (event.target.closest('a')) {
      siteNav.classList.remove('open');
      menuButton.setAttribute('aria-expanded', 'false');
    }
  });

  const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
  if (SpeechRecognition) {
    const recognition = new SpeechRecognition();
    recognition.lang = 'en-US';
    recognition.interimResults = false;
    recognition.continuous = false;
    voiceButton.addEventListener('click', () => {
      try {
        voiceButton.classList.add('listening');
        voiceButton.setAttribute('aria-label', 'Listening');
        recognition.start();
      } catch {
        voiceNote.textContent = 'The microphone is already listening. Speak naturally, then pause.';
      }
    });
    recognition.addEventListener('result', event => {
      prompt.value = event.results[0][0].transcript;
      updateCount();
      prompt.focus();
    });
    recognition.addEventListener('end', () => {
      voiceButton.classList.remove('listening');
      voiceButton.setAttribute('aria-label', 'Speak to SOL');
    });
    recognition.addEventListener('error', event => {
      voiceButton.classList.remove('listening');
      voiceNote.textContent = event.error === 'not-allowed'
        ? 'Microphone permission is blocked. Open this site’s browser settings and allow microphone access.'
        : 'Voice input did not work this time. You can still type your message.';
    });
  } else {
    voiceButton.disabled = true;
    voiceButton.dataset.unsupported = 'true';
    voiceButton.title = 'Speech recognition is unavailable in this browser';
  }

  const savedDraft = safeGet(STORAGE_KEY);
  if (savedDraft) prompt.value = savedDraft;
  updateCount();

  if ('serviceWorker' in navigator && (window.location.protocol === 'https:' || ['localhost', '127.0.0.1'].includes(window.location.hostname))) {
    window.addEventListener('load', () => navigator.serviceWorker.register('./service-worker.js').catch(() => {}));
  }
})();

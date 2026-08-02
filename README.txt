PROJECT SOL V8 — DEPLOYMENT

Upload every item inside this folder to the public/root folder of projectsol.org:
- index.html
- assets/ folder
- manifest.webmanifest
- service-worker.js

Do not upload the outer project-sol-v8 folder itself unless your host requires it.
The file named index.html must sit in the website's main public folder.

WHAT WORKS NOW
- Responsive homepage for phones, tablets, and computers
- Accessible navigation and form controls
- Voice-to-text where the browser supports it
- Spoken first-step response after user interaction
- Local draft saving on the visitor's device
- Guided first-step responses without requiring an API key
- Installable/offline-ready foundation through a web manifest and service worker
- Clickable #ProjectSOL and projectsol.org links

IMPORTANT LIMITATION
This version does not connect to a live AI model. It provides safe guided responses in the browser. A real AI conversation requires a secure server-side API connection. Never place a private API key directly inside app.js or index.html.

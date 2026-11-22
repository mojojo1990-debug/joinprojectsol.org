# joinprojectsol.org — Static Website Architecture

## Current design

The website is a static, public concept preview on GitHub Pages. It has **no live chatbot or AI backend**.

| File | Purpose |
|---|---|
| `index.html` | Public, bilingual concept-page structure |
| `styles.css` | Responsive visual presentation |
| `app.js` | EN/ES toggle, mobile navigation, network map, local First-Step Studio |
| `manifest.webmanifest` | Installable app identity and icons |
| `service-worker.js` | Cache of public static files and offline fallback |
| `check_site.py`, `homepage.test.mjs`, `retired-chat.test.mjs` | Quality and regression checks |

## Data boundaries

The First-Step Studio uses a fixed template in the browser, without remote processing of submitted ideas. It does not need accounts, model APIs, payment credentials, or a server database. Visitors can explicitly copy or download their plan. The external LinkedIn link leaves this site; the host may maintain normal access logs.

## Retirement boundary

The earlier AI chat API, browser chat client, and AI-deployment launcher have been removed from the current branch. They remain retrievable from earlier Git history, not from the new site's live assets. Any separately deployed external services or previously created secrets require review in the relevant provider account.

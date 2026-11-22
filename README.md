# joinprojectsol.org — Community Concept Preview

**Human First. Community Focused.** joinprojectsol.org is a Dallas-first community vision focused on connecting neighbors, practical skills, local businesses, mentorship, and second chances. This is an early-stage concept preview, not a launched social network or an incorporated nonprofit.

## What the current website does

- Explains the community vision and the separate Our Block Digital venture.
- Offers responsive English and Spanish pages and navigation.
- Presents an interactive map of the proposed community network.
- Includes the **First-Step Studio**, a local, rule-based planning template. Visitors choose a goal, enter an idea, and receive three suggestions. They can copy or save their plan as text.
- Uses a web manifest and service worker for an installable, offline-capable static website.

**There is no AI chat service, chatbot backend, account system, or user-submitted idea upload.** The guided plan runs in the visitor's browser. Site hosting still involves ordinary web-server requests and possible host logs.

## Local testing

Requires Python 3 and Node.js 20 or newer; no package installation or credentials needed.

```bash
npm test
```

The tests validate site structure, bilingual interactions, planning functionality, static asset references, and the absence of retired chat-service files.

## Hosting

This repository is published as a static site by **GitHub Pages**, from the root of the `main` branch, with custom domain `joinprojectsol.org`. See [DEPLOYMENT.md](DEPLOYMENT.md).

## Safeguards

- Never commit secrets, contact records, or private community information to this public repository.
- Do not add a public submission form without explicit permission, a data-handling plan, and appropriate privacy protections.
- Keep descriptions clear about which activities are proposed versus operating.
- AI chat is intentionally retired; do not reintroduce the old API service as part of routine maintenance.

© 2026 joinprojectsol.org.

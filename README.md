# Project SOL 0.2.0-alpha.2 — Live AI + One-Click Launch

Project SOL is a mobile-first website with a real AI conversation experience. The public browser calls a private Vercel Function at `/api/chat`; only that server function can read the OpenAI API key.


## Easiest launch path

1. Upload this project to the root of `mojojo1990-debug/joinprojectsol.org`.
2. Open `LAUNCH.html` and tap **Deploy Project SOL**.
3. Sign in to Vercel, paste `OPENAI_API_KEY`, and tap **Deploy**.

The key is entered directly into Vercel and must never be committed to GitHub.

## What works

- Real multi-turn AI conversation
- SOL personality and Project SOL mission instructions
- Typed and microphone input
- Optional spoken replies
- New-conversation control
- Recent-context memory during the open page session
- Input validation, moderation, timeouts, origin checks, honeypot, and basic rate limiting
- Responsive, accessible, installable web app foundation
- Automated static and backend tests

## Security rule

Never place `OPENAI_API_KEY` in HTML, JavaScript under `assets/`, GitHub files, screenshots, chat messages, or the iPhone Files app. Add it only in Vercel Project Settings → Environment Variables.

## Deploy on Vercel

1. Upload this project to the root of the GitHub repository `mojojo1990-debug/joinprojectsol.org`.
2. Create or open a Vercel account and import that GitHub repository.
3. In the Vercel project, open **Settings → Environment Variables**.
4. Add `OPENAI_API_KEY` with the API key value for Production, Preview, and Development as desired.
5. Add `OPENAI_MODEL` with `gpt-5-mini` (optional; this is the default).
6. Deploy or redeploy after adding the variables.
7. In Vercel Domains, add `joinprojectsol.org` and follow the DNS instructions.
8. Test `/api/chat` through the website before announcing the launch.

GitHub Pages alone cannot run the private `/api/chat` backend. The repository should be deployed through Vercel for the live assistant to work.

## Local checks

```bash
npm test
```

These tests do not call the real OpenAI API. They use a simulated response so no key or credits are required.

## Release status

Alpha: the live AI path is implemented and automated tests pass. A real end-to-end production call still requires the owner's OpenAI API key and Vercel deployment.

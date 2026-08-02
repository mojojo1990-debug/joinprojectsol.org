# Changelog

## 0.2.0-alpha.2

- Added `LAUNCH.html` with a Vercel one-click deployment flow.
- Requires the private `OPENAI_API_KEY` during deployment.
- Pre-fills the non-sensitive `OPENAI_MODEL` value.
- Updated release metadata and setup documentation.


## 0.2.0-alpha.1 — Live AI foundation

- Replaced the local scripted planner with a real `/api/chat` AI backend.
- Added Project SOL-specific SOL instructions.
- Added multi-turn context for the current page session.
- Added moderation, rate limiting, validation, origin checks, timeout handling, and bot honeypot.
- Added optional spoken replies and improved microphone flow.
- Added automated backend tests with a mocked OpenAI service.
- Added Vercel configuration and environment-variable documentation.
- Prevented service-worker caching of API requests.

## 0.1.0-rc.1

- Static release candidate and guided local planning experience.

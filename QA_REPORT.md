# joinprojectsol.org — Community Preview Quality Checks

## Automated pipeline

GitHub Actions runs `npm test` for pull requests and pushes to `main`. The suite covers:

- Python checks for HTML references, sections, icons, manifest and nonempty files
- JavaScript syntax for the homepage controller and service worker
- Bilingual homepage translations
- Language toggle, mobile menu, interactive network map and First-Step Studio interactions
- First-Step Studio reset and plan retranslation
- Existence of app icons and cache-listed resources
- Removal of retired chat client, AI backend, Vercel one-click launcher and old API tests
- Absence of live chat API calls in active website scripts

## Manual checks after deployment

- Test on iPhone Safari and desktop browser
- Verify domain, HTTPS, navigation, 404 and offline experience
- Generate, copy, download and reset a first-step plan in both languages
- Confirm there is no AI chat UI or API-driven suggestion anywhere in the current public experience
- Review links and accessibility on narrow screens

The live community network, user accounts, and organization formation remain proposed rather than claimed to be launched.

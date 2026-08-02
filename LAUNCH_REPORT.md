# Project SOL 0.1.0-rc.1 Launch Report

## Release status
**Ready for public static-site launch after the live-domain smoke test.**

## What works
- Responsive homepage and navigation
- Guided first-step planner
- Draft saving on the visitor's device
- Voice input on browsers that provide speech recognition
- Spoken first-step response on browsers that provide speech synthesis
- Copy and native-share controls
- Offline fallback and installable web-app manifest
- Search/social metadata and custom 404 page
- Keyboard, screen-reader, reduced-motion, and increased-contrast support
- Automated GitHub quality checks

## Important product boundary
The planner is local and rule-based. It is not yet connected to a live AI model. The interface labels this honestly. Live AI requires a secure server-side backend and secret management; no private API key is included in the public website.

## Critical correction
All public URLs now use `https://joinprojectsol.org/`. `projectsol.org` belongs to another organization and must not be used for this project.

## Automated checks passed
- JavaScript syntax
- Manifest JSON validity
- Duplicate HTML IDs
- Internal anchor targets
- Local asset existence
- Required launch files
- Empty-file detection
- Local HTTP response checks
- ZIP integrity

## Final live checks after upload
1. Open `https://joinprojectsol.org/` in Safari and Chrome.
2. Confirm the lock icon/HTTPS.
3. Submit a planning prompt.
4. Test Copy plan and Share plan.
5. Test the microphone after granting permission.
6. Add the site to the iPhone Home Screen and reopen it.
7. Open a nonexistent path and confirm the 404 page.
8. Confirm Privacy, Terms, and Security links open the existing repository documents.

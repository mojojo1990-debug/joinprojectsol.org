# joinprojectsol.org — Release Checklist

## Before merge

- [ ] `npm test` passes on the exact branch
- [ ] English/Spanish toggle updates visible copy
- [ ] First-Step Studio accepts an idea and generates three guided steps
- [ ] Empty idea shows validation, and copy/download/reset work
- [ ] Mobile menu and community network nodes work
- [ ] Layout is readable around 390 px and on desktop
- [ ] Keyboard navigation and focus states remain usable
- [ ] No AI chatbot, server endpoint, or API key is introduced
- [ ] No personal records or secrets are committed
- [ ] Privacy, roadmap and product descriptions remain accurate
- [ ] `VERSION` and `CHANGELOG.md` are updated
- [ ] Service-worker cache is updated when assets change

## After merge

- [ ] GitHub Pages deployment succeeds
- [ ] https://joinprojectsol.org/ works over HTTPS
- [ ] CSS/JS load and the app's new version is visible
- [ ] Mobile smoke test passes
- [ ] Prior known-good commit is available for rollback

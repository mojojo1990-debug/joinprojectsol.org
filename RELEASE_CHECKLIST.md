# Release Checklist

## Before merging

- [ ] The homepage loads without visible errors
- [ ] Navigation links work
- [ ] Conversation form accepts text
- [ ] Empty-form validation works
- [ ] Copy and reset controls work
- [ ] Mobile menu opens and closes
- [ ] Layout works around 390 px width
- [ ] Layout works on desktop
- [ ] Keyboard focus is visible
- [ ] Voice failure does not break typing
- [ ] No private API keys or secrets are present
- [ ] `VERSION` is correct
- [ ] `CHANGELOG.md` is updated
- [ ] Service-worker cache name is updated when assets change

## After deployment

- [ ] `https://joinprojectsol.org/` loads
- [ ] HTTPS is active
- [ ] Custom domain still points to the repository
- [ ] CSS and JavaScript load correctly
- [ ] A hard refresh shows the new release
- [ ] Previous release ZIP is saved for rollback

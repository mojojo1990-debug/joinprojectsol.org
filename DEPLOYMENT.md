# Deploy joinprojectsol.org using GitHub Pages

This site requires **static hosting only**. Do not deploy an AI/chat API or supply model API credentials.

1. Make changes on a branch and open a pull request.
2. Run `npm test` and ensure GitHub Actions succeeds.
3. Merge an approved change into `main`.
4. In GitHub repository **Settings → Pages**, keep **Deploy from a branch → main → /(root)** and confirm custom domain `joinprojectsol.org`.
5. Wait for the Pages deployment to succeed, then check HTTPS and test the site on a phone and desktop.
6. Verify EN/ES switching, menu, interactive network nodes, First-Step Studio, and the local copy/download controls.

Keep `CNAME`, `LICENSE`, and the privacy/security documents.

## Rollback

Revert the specific merge commit on `main` if a release fails. Confirm the prior stable static site and do not re-enable the retired chat service as an accidental rollback. Git history retains prior source revisions; it does not guarantee removal of separately deployed applications or private environment variables.

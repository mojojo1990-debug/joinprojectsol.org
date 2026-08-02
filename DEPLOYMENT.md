# Deploying Project SOL with GitHub Pages

## Repository layout

The contents of this package belong at the top level of the repository, beside the existing `CNAME`, legal, privacy, and security files.

Do not upload the outer `project-sol-build-001` folder as one nested folder.

## Safe mobile upload process

1. Download and unzip the Build 001 package in the iPhone Files app.
2. Open the `joinprojectsol.org` repository on GitHub.
3. Use **Add file → Upload files**.
4. Upload the files and folders from inside the Build 001 folder.
5. Keep the existing `CNAME` file.
6. Do not delete `LICENSE`, `PRIVACY.md`, `SECURITY.md`, or `TERMS.md`.
7. Commit with the message: `release: deploy Project SOL Build 001`.

## GitHub Pages settings

In the repository:

1. Open **Settings**.
2. Open **Pages**.
3. Set the source to **Deploy from a branch**.
4. Select branch `main` and folder `/ (root)`.
5. Save.
6. Confirm the custom domain is `joinprojectsol.org`.
7. Enable **Enforce HTTPS** when available.

## Rollback

If the release breaks:

1. Open the repository commit history.
2. Find the last known working deployment.
3. Revert the Build 001 commit, or re-upload the previous release files.
4. Confirm the site works before making another change.

Never troubleshoot production by deleting random files. Restore a known working release first.

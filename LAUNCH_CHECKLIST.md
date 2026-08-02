# Live AI Launch Checklist

- [ ] Repository contains `api/chat.mjs`, `package.json`, and `vercel.json`.
- [ ] Vercel project is connected to the correct GitHub repository.
- [ ] `OPENAI_API_KEY` is set in Vercel, never committed to GitHub.
- [ ] `OPENAI_MODEL=gpt-5-mini` is set or the default is accepted.
- [ ] Vercel is redeployed after environment variables are saved.
- [ ] `joinprojectsol.org` is attached to the Vercel deployment.
- [ ] First live message succeeds on iPhone.
- [ ] Follow-up message remembers the subject.
- [ ] Voice input and spoken replies are tested.
- [ ] Error state is tested with the key temporarily unavailable in Preview only.
- [ ] OpenAI billing and usage alerts are configured.
- [ ] Privacy statement accurately describes AI processing.
- [ ] Release is promoted from alpha only after all manual tests pass.

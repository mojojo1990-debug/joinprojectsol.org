# QA Report — Project SOL 0.2.0-alpha.1

## Passed automatically

- HTML local-resource validation
- Duplicate ID detection
- Internal anchor validation
- Manifest and icon validation
- Required launch-file validation
- JavaScript syntax: frontend, backend, service worker
- Empty-message rejection
- Unapproved-origin rejection
- Moderation-block behavior
- Successful mocked OpenAI response path
- Conversation response parsing
- ZIP integrity

## Security controls implemented

- API key is server-only through `OPENAI_API_KEY`
- Same-origin API design
- Production and Vercel preview origin allowlist
- 4,000-character message maximum
- 12-message context maximum
- 45-second browser timeout
- OpenAI moderation before generation
- Basic in-memory IP rate limit: 20 requests per 10 minutes
- Honeypot bot field
- No-store API responses
- No permanent chat transcript in browser storage
- Service worker explicitly ignores `/api/`

## Manual launch tests still required after deployment

- Confirm Vercel has `OPENAI_API_KEY`
- Send first message on iPhone Safari
- Send follow-up and confirm context
- Test microphone permission allowed and denied
- Test “Read replies aloud”
- Test New conversation
- Test weak-network error message
- Confirm custom domain and HTTPS
- Confirm privacy, terms, and security pages remain available
- Review OpenAI usage and spending limits

## Known alpha limitation

The rate limiter is memory-based and suitable for an early alpha, but it is not globally durable across every server instance. Before high-traffic public promotion, replace it with a shared rate-limit store such as Vercel KV/Redis or another managed datastore.

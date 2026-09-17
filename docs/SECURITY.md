# Security and Privacy

## Upload security
- Accept only explicitly supported image formats.
- Enforce byte-size and decoded-dimension limits.
- Decode and re-encode images server-side.
- Strip EXIF and other unnecessary metadata.
- Use generated object keys rather than user filenames.
- Keep storage private and expose content through short-lived signed URLs.

## Application security
- Authentication and authorization for stored searches.
- CSRF protection where applicable.
- Strict Content Security Policy.
- Rate limits and abuse controls on upload/search endpoints.
- Structured security/audit events without logging raw uploaded images.
- Encryption in transit and at rest.
- Dependency and secret scanning in CI.

## Data lifecycle
- Minimize stored data.
- Define short retention windows for query images and intermediate representations.
- Provide deletion endpoints and account deletion tooling.
- Prevent cross-account result access.

## Search scope
Production similarity search should operate against an authorized corpus. ZyraFlock's current endpoint returns synthetic demonstration records and does not identify unknown people or perform internet-wide biometric face search.

## Compliance UI
The frontend requires explicit confirmations for image authorization, Terms of Service, and the Privacy Notice before a search can start. Server-side policy enforcement must remain authoritative; frontend checkboxes alone are not a security control.

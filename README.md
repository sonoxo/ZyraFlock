# ZyraFlock

A dark, privacy-conscious visual-search interface prototype inspired by modern image-search products.

## Live deployment
- Production: https://zyraflock.onrender.com
- Hosting: Render free web service
- Source: GitHub `sonoxo/ZyraFlock`
- Branch: `main`
- Auto-deploy: enabled

## Stack
- Next.js 15 + React 19 + TypeScript
- Tailwind CSS
- Next.js Route Handlers for the mock API

## Run locally
```bash
npm install
npm run dev
```
Open http://localhost:3000.

## Implemented
- Responsive dark landing page
- Drag/drop + device/camera image input
- JPG/PNG/WEBP validation and 10MB limit
- Mandatory authorization, Terms, and Privacy confirmations
- Animated processing state
- Results grid with similarity indicators, locked/blurred previews, and source domains
- `POST /api/search` mock endpoint

## Documentation
- `docs/ARCHITECTURE.md`
- `docs/API.md`
- `docs/DEVELOPMENT.md`
- `docs/SECURITY.md`

## Architecture boundary
The current API deliberately returns synthetic demo records. It does **not** identify a person, create persistent biometric profiles, scrape the web for faces, or expose a real-world face-tracking pipeline.

For production visual search, keep the same UI/API contract while using consented, non-biometric image similarity over an authorized corpus, with retention limits, abuse controls, rate limits, audit logs, deletion tooling, and access controls.

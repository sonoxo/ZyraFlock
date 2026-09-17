# Development Guide

## Quick start
```bash
git clone https://github.com/sonoxo/ZyraFlock.git && cd ZyraFlock && npm install && npm run dev
```

Open `http://localhost:3000`.

## Production build
```bash
npm install
npm run build
npm start
```

## Current project layout
```text
app/
  api/search/route.ts
  globals.css
  layout.tsx
  page.tsx
package.json
postcss.config.js
tailwind.config.ts
tsconfig.json
docs/
```

## Recommended component refactor
```text
components/
  Header.tsx
  Hero.tsx
  UploadZone.tsx
  CompliancePanel.tsx
  SearchProgress.tsx
  ResultCard.tsx
  ResultsGrid.tsx
  Footer.tsx
```

## Recommended service layout
```text
services/
  search/
    main.py
    requirements.txt
    tests/
```

## Frontend workflow
- Drag/drop or select an image.
- Validate JPG/PNG/WEBP and 10 MB maximum.
- Display local preview.
- Require authorization, Terms, and Privacy confirmations.
- Submit multipart request.
- Display animated analysis progress.
- Render structured results.

## Terminal command
```bash
git clone https://github.com/sonoxo/ZyraFlock.git && cd ZyraFlock && npm install && npm run dev
```

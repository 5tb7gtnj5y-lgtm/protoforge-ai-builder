# ProtoForge AI Builder

ProtoForge turns an uploaded image or document plus a plain-English build instruction into an editable, working web prototype.

## Features

- Upload images, text, Markdown, CSV, JSON, HTML, XML, DOCX, and PDF files.
- Send images and instructions together to a vision-capable model through Vercel AI Gateway.
- Generate both a screen-by-screen specification and a self-contained interactive HTML prototype.
- Fall back to a basic local builder if AI is unavailable.
- Preview, edit, save, and export a standalone HTML prototype.
- Check deployment status at `/api/health`.

## Local development

```bash
npm install
npx vercel link
npx vercel env pull .env.local
npm run dev
```

Vercel supplies OIDC authentication automatically to production functions. The optional `AI_GATEWAY_MODEL` environment variable overrides the default model.

## API

- `GET /api/health` returns deployment and AI Gateway configuration status.
- `POST /api/analyse` accepts an instruction, extracted source text, an optional image data URL, file name, and style. It returns the structured specification and complete working HTML.

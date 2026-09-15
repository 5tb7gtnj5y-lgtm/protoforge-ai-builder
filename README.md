# ProtoForge AI Builder

ProtoForge turns requirements, documents, and images into editable working web prototypes.

## Features

- Upload images, text, Markdown, CSV, JSON, HTML, XML, DOCX, and PDF files.
- Convert source material into a screen-by-screen application specification.
- Use Vercel AI Gateway for production AI analysis.
- Fall back to the built-in local analyser if AI is unavailable.
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
- `POST /api/analyse` accepts `{ "text": "...", "style": "modern" }` and returns a structured prototype specification.

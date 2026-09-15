# ProtoForge AI Builder

ProtoForge turns an uploaded image or document plus a plain-English build instruction into an editable, working web prototype.

## Features

- Upload images, text, Markdown, CSV, JSON, HTML, XML, DOCX, and PDF files.
- Send images and instructions together to Google Gemini's no-card free tier, with Vercel AI Gateway as an automatic fallback.
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

Add a free Google AI Studio key as `GOOGLE_GENERATIVE_AI_API_KEY` in Vercel. ProtoForge then uses `gemini-3.8-flash` directly, so Vercel billing is not required. The Google free tier may use uploaded content to improve its products, so it is not suitable for sensitive documents.

If no Google key is configured, ProtoForge tries `inclusionai/ling-3.0-flash-vl-free` through Vercel AI Gateway. Some Vercel accounts require a payment method even for that zero-cost model.

## API

- `GET /api/health` returns deployment and AI Gateway configuration status.
- `POST /api/analyse` accepts an instruction, extracted source text, an optional image data URL, file name, and style. It returns the structured specification and complete working HTML.

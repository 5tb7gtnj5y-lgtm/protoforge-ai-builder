# Mockingbird Prototype Agent

Mockingbird turns an uploaded image, PDF, Word/text file, or pasted brief into a working browser prototype.

After the first build, the same instruction box becomes a revision agent: ask for changes and Mockingbird modifies the existing prototype instead of starting again.

## Features

- Image/file upload plus plain-English instructions.
- Image-to-prototype and file-to-prototype generation.
- Iterative revisions using the current prototype as working context.
- Functional controls rather than a static mock-up.
- Desktop, tablet and mobile preview modes.
- Undo/version history and standalone HTML export.
- Browser-local fallback if the AI route is temporarily unavailable.
- `GET /api/health` reports service and AI configuration.
- `POST /api/analyse` builds or revises the prototype.

## AI

Mockingbird uses Vercel AI Gateway by default. A Google AI Studio key can also be supplied through `GOOGLE_GENERATIVE_AI_API_KEY`, `GEMINI_API_KEY`, or `GOOGLE_API_KEY`.

The generated prototype is returned as one self-contained HTML document with inline CSS and JavaScript, so it can be exported and opened independently.

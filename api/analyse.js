import { generateObject } from "ai";
import { z } from "zod";

const MAX_SOURCE_CHARS = 20_000;
const MODEL = process.env.AI_GATEWAY_MODEL || "openai/gpt-5.6-sol";

const screenSchema = z.object({
  name: z.string().min(1).max(80),
  heading: z.string().min(1).max(120),
  intro: z.string().max(240),
  fields: z.array(z.string().min(1).max(80)).max(12),
  buttons: z.array(z.string().min(1).max(60)).max(8),
});

const specSchema = z.object({
  name: z.string().min(1).max(80),
  style: z.enum(["modern", "govuk", "dashboard", "mobile"]),
  theme: z.enum(["blue", "green", "purple", "slate"]),
  screens: z.array(screenSchema).min(2).max(12),
});

function cleanText(value, fallback = "") {
  return typeof value === "string" ? value.trim() : fallback;
}

export default async function handler(request, response) {
  response.setHeader("Cache-Control", "no-store");

  if (request.method !== "POST") {
    response.setHeader("Allow", "POST");
    return response.status(405).json({ error: "Method not allowed" });
  }

  const text = cleanText(request.body?.text);
  const requestedStyle = cleanText(request.body?.style, "modern");

  if (!text) {
    return response.status(400).json({ error: "Source text is required" });
  }

  if (text.length > MAX_SOURCE_CHARS) {
    return response.status(413).json({
      error: `Source text must be ${MAX_SOURCE_CHARS.toLocaleString()} characters or fewer`,
    });
  }

  const style = ["modern", "govuk", "dashboard", "mobile"].includes(
    requestedStyle,
  )
    ? requestedStyle
    : "modern";

  try {
    const { object, usage } = await generateObject({
      model: MODEL,
      schema: specSchema,
      prompt: `You are the analysis engine for ProtoForge, a prototype builder.

Turn the source below into a concise, usable multi-screen application specification.

Rules:
- Return between 2 and 12 screens in a sensible user journey.
- Keep labels plain, short, and accessible.
- Include only fields and buttons that are useful for the described task.
- Use the requested style exactly: ${style}.
- Choose one theme from blue, green, purple, or slate.
- Do not include commentary outside the specification.

SOURCE:
${text}`,
    });

    return response.status(200).json({
      spec: {
        ...object,
        style,
      },
      gateway: {
        provider: "vercel-ai-gateway",
        model: MODEL,
        usage,
      },
    });
  } catch (error) {
    console.error("ProtoForge AI analysis failed", {
      name: error?.name,
      message: error?.message,
    });

    return response.status(503).json({
      error: "AI analysis is temporarily unavailable",
      fallback: "local-builder",
    });
  }
}

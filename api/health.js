const GATEWAY_MODEL = process.env.AI_GATEWAY_MODEL || "openai/gpt-5.6-sol";
const GOOGLE_MODEL = process.env.GOOGLE_AI_MODEL || "gemini-2.5-flash";
const GOOGLE_CONFIGURED = Boolean(
  process.env.GOOGLE_GENERATIVE_AI_API_KEY ||
    process.env.GEMINI_API_KEY ||
    process.env.GOOGLE_API_KEY,
);

export default function handler(request, response) {
  response.setHeader("Cache-Control", "no-store");
  if (request.method !== "GET") {
    response.setHeader("Allow", "GET");
    return response.status(405).json({ status: "error", error: "Method not allowed" });
  }

  return response.status(200).json({
    status: "ok",
    service: "mockingbird-prototype-agent",
    version: "3.0.0",
    environment: process.env.VERCEL_ENV || "local",
    capabilities: ["image-to-prototype", "file-to-prototype", "iterative-revision", "html-export"],
    ai: {
      provider: GOOGLE_CONFIGURED ? "google-ai-studio" : "vercel-ai-gateway",
      model: GOOGLE_CONFIGURED ? GOOGLE_MODEL : GATEWAY_MODEL,
      freeGoogleKeyConfigured: GOOGLE_CONFIGURED,
      gatewayAuthentication: process.env.AI_GATEWAY_API_KEY ? "api-key" : "vercel-oidc",
    },
    timestamp: new Date().toISOString(),
  });
}

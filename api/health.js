const SERVICE = "protoforge-ai-builder";
const GATEWAY_MODEL =
  process.env.AI_GATEWAY_MODEL || "inclusionai/ling-3.0-flash-vl-free";
const GOOGLE_MODEL = process.env.GOOGLE_AI_MODEL || "gemini-3.8-flash";
const GOOGLE_FREE_TIER_CONFIGURED = Boolean(
  process.env.GOOGLE_GENERATIVE_AI_API_KEY ||
    process.env.GEMINI_API_KEY ||
    process.env.GOOGLE_API_KEY,
);

export default function handler(request, response) {
  response.setHeader("Cache-Control", "no-store");

  if (request.method !== "GET") {
    response.setHeader("Allow", "GET");
    return response.status(405).json({
      status: "error",
      error: "Method not allowed",
    });
  }

  return response.status(200).json({
    status: "ok",
    service: SERVICE,
    version: "2.2.0",
    environment: process.env.VERCEL_ENV || "local",
    aiGateway: {
      configured: true,
      authentication: process.env.AI_GATEWAY_API_KEY
        ? "api-key"
        : "vercel-oidc",
      model: GATEWAY_MODEL,
      role: GOOGLE_FREE_TIER_CONFIGURED ? "fallback" : "primary",
    },
    aiBuilder: {
      ready: GOOGLE_FREE_TIER_CONFIGURED,
      provider: GOOGLE_FREE_TIER_CONFIGURED
        ? "google-gemini-free-tier"
        : "vercel-ai-gateway",
      model: GOOGLE_FREE_TIER_CONFIGURED ? GOOGLE_MODEL : GATEWAY_MODEL,
      pricing: "free-tier",
    },
    timestamp: new Date().toISOString(),
  });
}

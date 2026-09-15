const SERVICE = "protoforge-ai-builder";
const MODEL =
  process.env.AI_GATEWAY_MODEL || "inclusionai/ling-3.0-flash-vl-free";

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
    version: "2.1.0",
    environment: process.env.VERCEL_ENV || "local",
    aiGateway: {
      configured: true,
      authentication: process.env.AI_GATEWAY_API_KEY
        ? "api-key"
        : "vercel-oidc",
      model: MODEL,
      pricing: MODEL.endsWith("-free") ? "free" : "provider-rate",
    },
    timestamp: new Date().toISOString(),
  });
}

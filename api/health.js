const SERVICE = "protoforge-ai-builder";
const MODEL = process.env.AI_GATEWAY_MODEL || "openai/gpt-6-astra";

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
    version: "2.0.0",
    environment: process.env.VERCEL_ENV || "local",
    aiGateway: {
      configured: true,
      authentication: process.env.AI_GATEWAY_API_KEY
        ? "api-key"
        : "vercel-oidc",
      model: MODEL,
    },
    timestamp: new Date().toISOString(),
  });
}

import { FastifyInstance } from "fastify";
import { requestOtpController } from "../../controllers/auth/requestOtp";

export default async function requestOtpRoute(fastify: FastifyInstance) {
  fastify.post("/requestOtp/:username", {
    schema: {
      params: {
        type: "object",
        required: ["username"],
        properties: {
          username: { type: "string" },
        },
      },
      body: {
        type: "object",
        required: ["otp"],
        properties: {
          otp: { type: "string" },
        },
      },
      response: {
        201: {
          type: "object",
          properties: {
            verified: { type: "boolean" },
          },
        },
      },
    },
    handler: requestOtpController,
  });
}

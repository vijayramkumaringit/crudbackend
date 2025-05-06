import { FastifyInstance } from "fastify";
import { loginController } from "../../controllers/auth/login";

export default function loginRoute(fastify: FastifyInstance) {
  fastify.post("/login", {
    schema: {
      body: {
        type: "object",
        required: ["username", "password"],
        properties: {
          username: { type: "string" },
          password: { type: "string" },
        },
      },
      response: {
        200: {
          type: "object",
          properties: {
            token: { type: "string" },
          },
        },
      },
    },
    handler: loginController,
  });
}

import fastify from "fastify";
import auth from "./plugins/auth";
import fastifyJwt from "@fastify/jwt";
import fastifyCors from "@fastify/cors";
// import redis from './plugins/redis';

export const app = fastify({ logger: true });

app.register(fastifyCors, {
  origin: "http://localhost:3000",
  methods: ["GET", "POST", "DELETE", "PUT"],
  allowedHeaders: ["Content-Type", "Authorization"],
  preflightContinue: false,
  credentials: true,
});
app.register(fastifyJwt, { secret: "supersecretkey" });
app.register(auth);

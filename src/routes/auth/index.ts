import { FastifyInstance } from "fastify";
import loginRoute from "./login";
import recoverRoute from "./recover";
import registerRoute from "./register";
import resetRoute from "./reset";
import requestOtpRoute from "./requestOtp";

export async function registerAuthRoutes(fastify:FastifyInstance){
fastify.register(loginRoute)
fastify.register(recoverRoute)
fastify.register(registerRoute)
fastify.register(resetRoute)
fastify.register(requestOtpRoute)
}
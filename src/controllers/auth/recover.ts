import { FastifyReply, FastifyRequest } from "fastify";
// import Redis from 'ioredis';
import prisma from "../../../prisma";
import { generateOtp, sendOTPEmail } from "../../utils/mailer";
import { otpMap } from "../../plugins/otpStore";

// const redis=new Redis();

export const recoverController = async (
  req: FastifyRequest<{ Body: { name: string } }>,
  reply: FastifyReply
): Promise<void> => {
  const { name } = req.body;

  if (!name) {
    return reply.code(400).send({ message: "Email or username is required" });
  }

  try {
    const user = await prisma.user.findUnique({
      where: { name },
    });

    if (!user) {
      return reply.code(404).send({ message: "No user found with that email" });
    }

    const otp = generateOtp();

    const expiresAt = new Date(Date.now() + 5 * 60 * 1000); // 5 minutes from now

    otpMap.set(name, { code: otp, expiresAt });

    await sendOTPEmail(name, otp);

    return reply.send({
      message: "User found. Proceeding with password reset.",
      user: {
        id: user.id,
        name: user.name,
      },
    });
  } catch (error) {
    console.error(error);
    reply.code(500).send({ message: "Internal server error" });
  }
};

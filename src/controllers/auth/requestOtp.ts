import { FastifyReply, FastifyRequest } from "fastify";
import prisma from "../../../prisma";
import { otpMap } from "../../plugins/otpStore";

export const requestOtpController = async (
  req: FastifyRequest<{ Params: { username: string }; Body: { otp: string } }>,
  reply: FastifyReply
): Promise<void> => {
  const { username } = req.params;
  const { otp } = req.body;

  if (!otp) {
    return reply.code(400).send({ message: "otp is required" });
  }

  try {
    const user = await prisma.user.findUnique({
      where: { name: username },
    });

    if (!user) {
      return reply
        .code(404)
        .send({ message: "No user found with that email or username" });
    }

    const storedOtp = otpMap.get(username);

    if (!storedOtp || storedOtp.expiresAt < new Date()) {
      return reply
        .code(400)
        .send({ message: "OTP has expired or was not requested" });
    }

    if (storedOtp.code !== otp) {
      return reply.code(401).send({ message: "Invalid OTP" });
    }

    // Optionally delete OTP after use
    otpMap.delete(username);

    return reply.send({
      message: "OTP verified. Proceeding with password reset.",
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

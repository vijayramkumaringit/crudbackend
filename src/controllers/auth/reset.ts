import { FastifyReply, FastifyRequest } from "fastify";
import prisma from "../../../prisma";
import bcrypt from "bcrypt";

export const resetController = async (
  req: FastifyRequest<{
    Params: { id: string };
    Body: { name: string; password: string };
  }>,
  reply: FastifyReply
): Promise<void> => {
  const { id } = req.params;
  const { password } = req.body;

  if (!password) {
    return reply.code(400).send({ message: "Password is required" });
  }

  try {
    const existingUser = await prisma.user.findUnique({
      where: { id },
    });

    if (!existingUser) {
      return reply.code(404).send({ message: "User not found" });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const updatedUser = await prisma.user.update({
      where: { id },
      data: { password: hashedPassword },
    });

    const { password: _, ...userWithoutPassword } = updatedUser;
    reply.code(200).send({
      message: "Password updated successfully",
      user: userWithoutPassword,
    });
  } catch (error) {
    console.error("Reset error:", error);
    reply.code(500).send({ message: "Failed to reset password", error });
  }
};

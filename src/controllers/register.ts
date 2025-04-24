import { FastifyReply, FastifyRequest } from 'fastify';
import prisma from '../../prisma';

export const addUser = async (
  req: FastifyRequest<{ Body: { name: string; password: string } }>,
  reply: FastifyReply
): Promise<void> => {
  const { name, password } = req.body;

  try {
    const existingUser = await prisma.user.findUnique({ where: { name } });
    if (existingUser) {
      reply.code(400).send({ message: 'User already exists' });
      return;
    }

    const user = await prisma.user.create({
      data: { name, password },
    });

    const { password: _, ...userWithoutPassword } = user;
    reply.code(201).send(userWithoutPassword);

  } catch (error) {
    console.error(error);
    reply.code(500).send({ message: 'Failed to create user', error });
  }
};

import { FastifyReply, FastifyRequest } from 'fastify';
import prisma from '../../prisma';

export const login = async (
  req: FastifyRequest<{ Body: { username: string; password: string } }>,
  reply: FastifyReply
): Promise<void> => {
  const { username, password } = req.body;

  const user = await prisma.user.findUnique({
    where: { name: username },
  });
  
  if (!user || user.password !== password) {
    reply.code(401).send({ message: 'Invalid username or password' });
    return;
  }

  const token = await reply.jwtSign({ username: user.name });
  reply.send({ token });
};


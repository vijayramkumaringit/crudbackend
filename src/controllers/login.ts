import { FastifyReply, FastifyRequest } from 'fastify';
import prisma from '../../prisma';
import bcrypt from 'bcrypt'; 

export const login = async (
  req: FastifyRequest<{ Body: { username: string; password: string } }>,
  reply: FastifyReply
): Promise<void> => {
  const { username, password } = req.body;

  if (!username) {
    return reply.code(400).send({ message: 'Username is required' });
  }

  if (!password) {
    return reply.code(400).send({ message: 'Password is required' });
  }

  try {
    const user = await prisma.user.findUnique({
      where: { name: username },
    });

    if (!user) {
      return reply.code(401).send({ message: 'Invalid username' });
    }

    const isValid = await bcrypt.compare(password, user.password);
    if (!isValid) {
     return reply.code(401).send({ message: 'Invalid password' });
      
    }

    const token = await reply.jwtSign({ username: user.name });

    reply.send({ token });
  } catch (error) {
    console.error(error);
    reply.code(500).send({ message: 'Login failed', error });
  }
};
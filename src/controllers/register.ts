import { FastifyReply, FastifyRequest } from 'fastify';
import prisma from '../../prisma';
import bcrypt from 'bcrypt'; 

export const addUser = async (
  req: FastifyRequest<{ Body: { name: string; password: string } }>,
  reply: FastifyReply
): Promise<void> => {
  const { name, password } = req.body;

  if (!name) {
    return reply.code(400).send({ message: 'Username is required' });
  }

  if (!password) {
    return reply.code(400).send({ message: 'Password is required' });
  }

  try {
    const existingUser = await prisma.user.findUnique({ where: { name } });
    if (existingUser) {
      return reply.code(400).send({ message: 'User already exists' });
      
    }

    const hashedPassword = await bcrypt.hash(password, 10); 

    const user = await prisma.user.create({
      data: { name, password: hashedPassword }, 
    });

    const { password: _, ...userWithoutPassword } = user;
    reply.code(201).send(userWithoutPassword);

  } catch (error) {
    console.error(error);
    reply.code(500).send({ message: 'Failed to create user', error });
  }
};

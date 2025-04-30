import { FastifyReply, FastifyRequest } from 'fastify';
import prisma from '../../prisma';
import bcrypt from 'bcrypt';

export const resetPassword = async (
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
    const existingUser = await prisma.user.findUnique({
      where: { name },
    });

    if (!existingUser) {
      return reply.code(404).send({ message: 'User not found' });
    }
    
    const hashedPassword = await bcrypt.hash(password, 10);

    const updatedUser = await prisma.user.update({
      where: { name },
      data: { password: hashedPassword },
    });

    const { password: _, ...userWithoutPassword } = updatedUser;
    reply.code(200).send({ message: 'Password updated successfully', user: userWithoutPassword });
  } catch (error) {
    console.error('Reset error:', error);
    reply.code(500).send({ message: 'Failed to reset password', error });
  }
}
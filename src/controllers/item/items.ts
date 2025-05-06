import { FastifyReply, FastifyRequest } from "fastify";
import prisma from "../../../prisma";

export const getItems = async (
  _req: FastifyRequest,
  reply: FastifyReply
): Promise<void> => {
  try {
    const items = await prisma.item.findMany();
    reply.send(items);
  } catch (error) {
    console.error(error);
    reply.code(500).send({ error: "Failed to fetch items" });
  }
};

export const addItem = async (
  req: FastifyRequest<{ Body: { name: string } }>,
  reply: FastifyReply
): Promise<void> => {
  const { name } = req.body as { name: string };

  if (!name || name.trim() === "") {
    return reply.code(400).send({ message: "Item name is required" });
  }

  try {
    const item = await prisma.item.create({
      data: { name },
    });
    reply.code(201).send(item);
  } catch (error) {
    console.error(error);
    reply.code(500).send({ message: "Failed to create item" });
  }
};

export const updateItem = async (
  req: FastifyRequest<{ Params: { id: string }; Body: { name: string } }>,
  reply: FastifyReply
): Promise<void> => {
  const { id } = req.params;
  const { name } = req.body;

  if (!name || name.trim() === "") {
    return reply.code(400).send({ message: "Item name is required" });
  }

  try {
    const item = await prisma.item.update({
      where: { id },
      data: { name },
    });
    reply.send({ message: "Item updated successfully.", item });
  } catch (error) {
    console.error(error);
    reply.code(404).send({ message: `Item with id ${id} not found.` });
  }
};

export const deleteItem = async (
  req: FastifyRequest<{ Params: { id: string } }>,
  reply: FastifyReply
): Promise<void> => {
  const { id } = req.params;

  try {
    await prisma.item.delete({
      where: { id },
    });

    reply.send({
      message: `Item with id ${id} has been removed successfully.`,
    });
  } catch (error) {
    console.error(error);
    reply.code(404).send({ message: `Item with id ${id} not found.` });
  }
};

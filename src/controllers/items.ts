import { FastifyReply, FastifyRequest } from 'fastify';
// import { v4 as uuidv4 } from 'uuid';
// import { Item, items } from '../Items';

import prisma from '../../prisma';

// let itemList: Item[] = [...items];

// export const getItems = async (_req: FastifyRequest, reply: FastifyReply): Promise<void> => {
//   reply.send(itemList);
// };

export const getItems = async (_req: FastifyRequest, reply: FastifyReply): Promise<void> => {
  try {
    const items = await prisma.item.findMany();
    reply.send(items);
  } catch (error) {
    reply.code(500).send({ error: 'Failed to fetch items' });
  }
};

// export const getItem = async (
//   req: FastifyRequest<{ Params: { id: string } }>, 
//   reply: FastifyReply
// ): Promise<void> => {
//   const { id } = req.params;

//   const item = itemList.find((i) => i.id === id);

//   if (!item) {
//     reply.code(404).send({ message: `Item with id ${id} not found.` });
//     return;
//   }

//   reply.send(item);
// };


// export const addItem = async (
//   req: FastifyRequest<{ Body: { name: string } }>, 
//   reply: FastifyReply
// ): Promise<void> => {
//   const { name } = req.body;
//   const newItem: Item = { id: uuidv4(), name };
//   itemList.push(newItem);
//   reply.code(201).send(newItem);
// };

export const addItem = async (
  req: FastifyRequest<{ Body: { name: string } }>, 
  reply: FastifyReply
): Promise<void> => {
  const { name } = req.body as {name:string};
  const item = await prisma.item.create({
    data: { name },
  });

  reply.code(201).send(item);
};

// export const updateItem = async (
//   req: FastifyRequest<{ Params: { id: string }; Body: { name: string } }>, 
//   reply: FastifyReply
// ): Promise<void> => {
//   const { id } = req.params;
//   const { name } = req.body;

//   const itemIndex = itemList.findIndex((i) => i.id === id);
//   if (itemIndex === -1) {
//     reply.code(404).send({ message: `Item with id ${id} not found.` });
//     return;
//   }

//   itemList[itemIndex] = { ...itemList[itemIndex], name };
//   reply.send({ message: 'Item updated successfully.' });
// };

export const updateItem = async (
  req: FastifyRequest<{ Params: { id: string }; Body: { name: string } }>, 
  reply: FastifyReply
): Promise<void> => {
  const { id } = req.params;
  const { name } = req.body;

  try {
    const item = await prisma.item.update({
      where: { id },
      data: { name },
    });
    reply.send({ message: 'Item updated successfully.', item });
  } catch (error) {
    reply.code(404).send({ message: `Item with id ${id} not found.` });
  }
};

// export const deleteItem = async (
//   req: FastifyRequest<{ Params: { id: string } }>, 
//   reply: FastifyReply
// ): Promise<void> => {
//   const { id } = req.params;

//   const itemIndex = itemList.findIndex((i) => i.id === id);
//   if (itemIndex === -1) {
//     reply.code(404).send({ message: `Item with id ${id} not found.` });
//     return;
//   }

//   itemList.splice(itemIndex, 1);
//   reply.send({ message: `Item with id ${id} has been removed successfully.` });
// };


export const deleteItem = async (
  req: FastifyRequest<{ Params: { id: string } }>, 
  reply: FastifyReply
): Promise<void> => {
  const { id } = req.params;

  try {
    await prisma.item.delete({
      where: { id },
    });

    reply.send({ message: `Item with id ${id} has been removed successfully.` });
  } catch (error) {
    reply.code(404).send({ message: `Item with id ${id} not found.` });
  }
};

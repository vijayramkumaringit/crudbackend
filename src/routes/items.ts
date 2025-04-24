import { FastifyInstance, FastifyPluginOptions } from 'fastify';
import {
  getItems,
  // getItem,
  addItem,
  updateItem,
  deleteItem,
} from '../controllers/items';
import { login } from '../controllers/login';

const Item = {
  type: 'object',
  properties: {
    id: { type: 'string' },
    name: { type: 'string' },
  },
};

export default function itemRoutes(
  fastify: FastifyInstance,
  _options: FastifyPluginOptions,
  done: () => void
) {
  fastify.post('/login', {
    schema: {
      body: {
        type: 'object',
        required: ['username', 'password'],
        properties: {
          username: { type: 'string' },
          password: { type: 'string' },
        },
      },
      response: {
        200: { type: 'object', properties: { token: { type: 'string' } } },
      },
    },
    handler: login,
  });

  fastify.get('/items', {      
    preHandler: [fastify.authenticate],schema: {
      response: {
        200: {
          type: 'array',
          items: Item,
        },
      },
    },
    handler: getItems,
  });

  // fastify.get('/items/:id', {
  //   preHandler: [fastify.authenticate],
  //   schema: {
  //     response: {
  //       200: Item,
  //       404: {
  //         type: 'object',
  //         properties: {
  //           message: { type: 'string' },
  //         },
  //       },
  //     },
  //   },
  //   handler: getItem,
  // });

  fastify.post('/items', {
    preHandler: [fastify.authenticate],
    schema: {
      body: {
        type: 'object',
        required: ['name'],
        properties: {
          name: { type: 'string' },
        },
      },
      response: {
        201: Item,
      },
    },
    handler: addItem,
  });

  fastify.put('/items/:id', {
    preHandler: [fastify.authenticate],
    schema: {
      body: {
        type: 'object',
        required: ['name'],
        properties: {
          name: { type: 'string' },
        },
      },
      response: {
        200: {
          type: 'object',
          properties: {
            message: { type: 'string' },
          },
        },
      },
    },
    handler: updateItem,
  });

  fastify.delete('/items/:id', {
    preHandler: [fastify.authenticate],
    schema: {
      response: {
        200: {
          type: 'object',
          properties: {
            message: { type: 'string' },
          },
        },
      },
    },
    handler: deleteItem,
  });

  done();
  
}
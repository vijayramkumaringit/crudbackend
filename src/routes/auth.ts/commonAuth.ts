import { FastifyPluginAsync } from 'fastify';
import { login } from '../../controllers/login';
import { addUser } from '../../controllers/register';
import { resetPassword } from '../../controllers/reset';


const authRoutes: FastifyPluginAsync = async (fastify) => {
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
        200: {
          type: 'object',
          properties: {
            token: { type: 'string' },
          },
        },
      },
    },
    handler: login,
  });

  fastify.post('/register', {
    schema: {
      body: {
        type: 'object',
        required: ['name', 'password'],
        properties: {
          name: { type: 'string' },
          password: { type: 'string' },
        },
      },
      response: {
        201: {
          type: 'object',
          properties: {
            id: { type: 'string' },
            name: { type: 'string' },
            password: { type: 'string' },
          },
        },
      },
    },
    handler: addUser,
  });

  fastify.post('/reset', {
    schema: {
      body: {
        type: 'object',
        required: ['name', 'password'],
        properties: {
          name: { type: 'string' },
          password: { type: 'string' },
        },
      },
      response: {
        200: {
          type: 'object',
          properties: {
            message: { type: 'string' },
            user: {
              type: 'object',
              properties: {
                id: { type: 'string' },
                name: { type: 'string' },
              },
            },
          },
        },
      },
    },
    handler: resetPassword,
  });
};

export default authRoutes;

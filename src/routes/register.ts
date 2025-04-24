import { FastifyInstance, FastifyPluginOptions } from 'fastify'
import { addUser } from '../controllers/register'

export default function registerRoutes(
  fastify: FastifyInstance,
  _options: FastifyPluginOptions,
  done: () => void
) {
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
  })

  done()
}

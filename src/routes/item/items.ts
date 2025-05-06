import { FastifyInstance, FastifyPluginOptions } from "fastify";
import {
  getItems,
  addItem,
  updateItem,
  deleteItem,
} from "../../controllers/item/items";

const Item = {
  type: "object",
  properties: {
    id: { type: "string" },
    name: { type: "string" },
  },
};

export default function itemRoutes(
  fastify: FastifyInstance,
  _options: FastifyPluginOptions,
  done: () => void
) {
  fastify.get("/items", {
    preHandler: [fastify.authenticate],
    schema: {
      response: {
        200: {
          type: "array",
          items: Item,
        },
      },
    },
    handler: getItems,
  });

  fastify.post("/items", {
    preHandler: [fastify.authenticate],
    schema: {
      body: {
        type: "object",
        required: ["name"],
        properties: {
          name: { type: "string" },
        },
      },
      response: {
        201: Item,
      },
    },
    handler: addItem,
  });

  fastify.put("/items/:id", {
    preHandler: [fastify.authenticate],
    schema: {
      body: {
        type: "object",
        required: ["name"],
        properties: {
          name: { type: "string" },
        },
      },
      response: {
        200: {
          type: "object",
          properties: {
            message: { type: "string" },
          },
        },
      },
    },
    handler: updateItem,
  });

  fastify.delete("/items/:id", {
    preHandler: [fastify.authenticate],
    schema: {
      response: {
        200: {
          type: "object",
          properties: {
            message: { type: "string" },
          },
        },
      },
    },
    handler: deleteItem,
  });

  done();
}

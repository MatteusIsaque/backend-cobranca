import { FastifyInstance } from "fastify";
import { ZodTypeProvider } from "fastify-type-provider-zod";
import z from "zod";
import { prisma } from "../lib/prisma";

export async function editServices(app: FastifyInstance) {
  app.withTypeProvider<ZodTypeProvider>().put(
    "/services/:id",
    // {
    //   schema: {
    //     // querystring: z.object({
    //     //   id: z.string(),
    //     // }),
    //     // body: z.object({
    //     //   value: z.string(),
    //     //   service: z.string(),
    //     //   pay_at: z.date(),
    //     // }),
    //   },
    // },
    async (request, reply) => {
      const { id } = request.query;
      const { service, value, pay_at } = request.body;

      console.log(id);

      const editServices = await prisma.services.update({
        where: {
          id: id,
        },
        data: {
          service,
          value,
          pay_at,
          updated_at: new Date().toISOString(),
        },
      });

      reply.send(205).send({ message: "editServices" });
    }
  );
}

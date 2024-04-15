import { FastifyInstance } from "fastify";
import { ZodTypeProvider } from "fastify-type-provider-zod";
import { prisma } from "../lib/prisma";
import { z } from "zod";

export async function findAllDebtor(app: FastifyInstance) {
  app.withTypeProvider<ZodTypeProvider>().get(
    "/debtor/find-all",
    {
      schema: {
        querystring: z.object({
          query: z.any(),
          pageIndex: z.string().nullish().default("0").transform(Number),
        }),
      },
    },
    async (request, reply) => {
      const { query, pageIndex } = request.query;

      const findMany = await prisma.debtor.findMany({
        where: {
          email: query,
        },
        include: {
          services: true,
        },
        take: pageIndex,
      });

      reply.send({ findMany });
    }
  );
}

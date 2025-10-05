import { jwt } from '@elysiajs/jwt';
import { desc, getTableColumns, sql } from 'drizzle-orm';
import { Elysia } from 'elysia';
import { z } from 'zod';
import { db } from '../database';
import { Sales } from '../database/schema';
import { env } from '../env';

const OffsetQuery = z.object({
  limit: z.coerce.number().min(0).max(100).default(10),
  offset: z.coerce.number().default(0),
});

const SalesResponse = z.object({
  sales: z.array(z.object({
    id: z.coerce.number().positive(),
    userId: z.uuidv4(),
    description: z.string().max(255),
    priceInCents: z.coerce.number().nonnegative(),
    createdAt: z.iso.datetime(),
  })),
  nextOffset: z.number(),
});

export const SalesController = new Elysia()
  .use(jwt({
    name: 'jwt',
    secret: env.JWT_SECRET,
  }))
  .get('/v1/sales', async ({ status, query }) => {
    // TODO authorization

    const sales = await db
      .select({
        ...getTableColumns(Sales),
        createdAt: sql`to_char(${Sales.createdAt}, 'YYYY-MM-DD"T"HH24:MI:SS"Z"')`.mapWith(String),
      })
      .from(Sales)
      // .where(eq(Sales.userId, userId)) // need authorization plugin
      .limit(query.limit)
      .offset(query.offset)
      .orderBy(desc(Sales.createdAt))

    const nextOffset = query.offset + query.limit;

    return status(200, {
      sales,
      nextOffset,
    });
  },
  {
    query: OffsetQuery,
    response: {
      200: SalesResponse,
    },
  });

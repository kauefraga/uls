import { jwt } from '@elysiajs/jwt';
import { eq, getTableColumns, sql } from 'drizzle-orm';
import { Elysia } from 'elysia';
import { z } from 'zod';
import { db } from '../database';
import { Organizations } from '../database/schema';
import { env } from '../env';

const OrganizationResponse = z.object({
  id: z.uuidv4(),
  name: z.string().max(50),
  color: z.string().max(7),
  createdAt: z.iso.datetime(),
});

const OrganizationsResponse = z.object({
  organizations: z.array(OrganizationResponse),
});

export const OrganizationsController = new Elysia()
  .use(jwt({
    name: 'jwt',
    secret: env.JWT_SECRET,
  }))
  .get('/v1/organizations/:id', async ({ status, params }) => {
    // TODO authorization

    const [organization] = await db
      .select({
        ...getTableColumns(Organizations),
        createdAt: sql`to_char(${Organizations.createdAt}, 'YYYY-MM-DD"T"HH24:MI:SS"Z"')`.mapWith(String),
      })
      .from(Organizations)
      .where(eq(Organizations.id, params.id))
      .limit(1);

    return status(200, organization);
  },
  {
    params: z.object({
      id: z.uuidv4(),
    }),
    response: {
      200: OrganizationResponse,
    },
  })
  .get('/v1/organizations', async ({ status }) => {
    const organizations = await db
      .select({
        ...getTableColumns(Organizations),
        createdAt: sql`to_char(${Organizations.createdAt}, 'YYYY-MM-DD"T"HH24:MI:SS"Z"')`.mapWith(String),
      })
      .from(Organizations);

    return status(200, {
      organizations: organizations
    });
  },
  {
    response: {
      200: OrganizationsResponse,
    },
  });

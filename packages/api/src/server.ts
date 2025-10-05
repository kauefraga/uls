import cors from '@elysiajs/cors';
import { openapi } from '@elysiajs/openapi';
import { Elysia } from 'elysia';
import { z } from 'zod';

import { AuthController } from './auth/auth.controller';
import { OrganizationsController } from './organizations/organizations.controller';
import { SalesController } from './sales/sales.controller';
import { UsersController } from './users/users.controller';

export function createServer() {
  const app = new Elysia()
    .use(cors())
    .use(openapi({
      mapJsonSchema: { zod: z.toJSONSchema },
    }))
    .use(UsersController)
    .use(AuthController)
    .use(OrganizationsController)
    .use(SalesController);

  return app;
}

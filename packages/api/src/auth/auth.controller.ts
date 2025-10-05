import { jwt } from '@elysiajs/jwt';
import * as argon2 from 'argon2';
import { eq } from 'drizzle-orm';
import { Elysia } from 'elysia';
import { z } from 'zod';
import { db } from '../database';
import { Users } from '../database/schema';
import { env } from '../env';

const AuthenticateUserBody = z.object({
  name: z.string().min(1),
  password: z.string().min(1),
});

const AuthenticateUserResponse = z.object({
  token: z.jwt(),
});

const UnauthorizedError = z.object({
  message: z.string()
});

export const AuthController = new Elysia()
  .use(jwt({
    name: 'jwt',
    secret: env.JWT_SECRET,
  }))
  .onError(({ error, status }) => {
    if (error instanceof Error && error.message === 'unauthorized') {
      return status(401);
    }

    // TODO refactor to use elysia custom errors
    // TODO handle not_found
  })
  .post('/v1/auth', async ({ body, status, jwt }) => {
    const [user] = await db
      .select()
      .from(Users)
      .where(eq(Users.name, body.name))
      .limit(1);

    if (!user) {
      throw new Error('not_found');
    }

    const isPasswordCorrect = await argon2.verify(user.password, body.password);

    if (!isPasswordCorrect) {
      throw new Error('unauthorized');
    }

    const token = await jwt.sign({
      organizationId: user.organizationId,
      id: user.id,
      name: user.name,
    });

    return status(200, { token });
  },
  {
    body: AuthenticateUserBody,
    response: {
      200: AuthenticateUserResponse,
      401: UnauthorizedError,
    },
  });

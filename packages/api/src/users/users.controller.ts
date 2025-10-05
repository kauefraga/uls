import { jwt } from '@elysiajs/jwt';
import * as argon2 from 'argon2';
import { Elysia } from 'elysia';
import { z } from 'zod';
import { db } from '../database';
import { Users } from '../database/schema';
import { env } from '../env';

const CreateUserBody = z.object({
  organizationId: z.uuidv4(),
  name: z.string().min(1),
  password: z.string().min(1),
});

const CreateUserResponse = z.object({
  token: z.jwt(),
});

export const UsersController = new Elysia()
  .use(jwt({
    name: 'jwt',
    secret: env.JWT_SECRET,
  }))
  .post('/v1/users', async ({ body, status, jwt }) => {
    const passwordHash = await argon2.hash(body.password);

    const [user] = await db
      .insert(Users)
      .values({ ...body, password: passwordHash })
      .returning();

    const token = await jwt.sign({
      organizationId: user.organizationId,
      id: user.id,
      name: user.name,
    });

    return status(201, { token });
  },
  {
    body: CreateUserBody,
    response: {
      201: CreateUserResponse,
    },
  });

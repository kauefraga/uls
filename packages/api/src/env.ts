import { z } from 'zod';

const EnvSchema = z.object({
  PORT: z.coerce.number().default(3333),
  DATABASE_URL: z.string().startsWith('postgres'),
  JWT_SECRET: z.string().min(8),
});

export const env = EnvSchema.parse(process.env);

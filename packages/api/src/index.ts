import { env } from './env';
import { createServer } from './server';

createServer()
  .listen({ port: env.PORT, hostname: '0.0.0.0' });

console.log(`:> server is running at http://localhost:${env.PORT}`);

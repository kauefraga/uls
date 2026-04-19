import { db } from '.';
import { Organizations, Sales, Users } from './schema';
import * as argon2 from 'argon2';

const [firstOrg] = await db
  .insert(Organizations)
  .values([
    { name: 'ULS Inc.', color: '#1231af' },
    { name: 'Anubis Corp.', color: '#dd93da' },
    { name: 'DWDC Enterprise', color: '#f0e32e' },
  ])
  .returning({ id: Organizations.id });

const password = await argon2.hash('mock');

const [user] = await db
  .insert(Users)
  .values({
    name: 'Mock user',
    password,
    organizationId: firstOrg.id,
  })
  .returning({ id: Users.id });

await db.insert(Sales).values([
  { userId: user.id, description: 'Potatoes', priceInCents: 1200 },
  { userId: user.id, description: 'Voleyball ball', priceInCents: 4000 },
  {
    userId: user.id,
    description: 'KVM 1 month subscription',
    priceInCents: 10000,
  },
  { userId: user.id, description: 'uls.dev domain', priceInCents: 10320 },
]);

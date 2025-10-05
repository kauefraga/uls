import { integer, pgTable, timestamp, uuid, varchar } from 'drizzle-orm/pg-core';

export const Users = pgTable('users', {
  id: uuid().primaryKey().defaultRandom(),
  organizationId: uuid('organization_id').references(() => Organizations.id).notNull(),
  name: varchar({ length: 50 }).unique().notNull(),
  password: varchar({ length: 100 }).notNull(),
  createdAt: timestamp('created_at').notNull().defaultNow(),
});

export const Organizations = pgTable('organizations', {
  id: uuid().primaryKey().defaultRandom(),
  name: varchar({ length: 50 }).notNull(),
  /** Color in hex (#000000) */
  color: varchar({ length: 7 }).notNull(),
  createdAt: timestamp('created_at').notNull().defaultNow(),
});

export const Sales = pgTable('sales', {
  id: integer().primaryKey().generatedAlwaysAsIdentity(),
  userId: uuid().references(() => Users.id).notNull(),
  description: varchar({ length: 255 }).notNull(),
  priceInCents: integer('price_in_cents').notNull(),
  createdAt: timestamp().notNull().defaultNow(),
});

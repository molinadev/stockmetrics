import { pgTable, serial, text, numeric, timestamp, unique } from 'drizzle-orm/pg-core'

export const portfolioPositions = pgTable('portfolio_positions', {
  id: serial('id').primaryKey(),
  ownerKey: text('owner_key').notNull(),
  symbol: text('symbol').notNull(),
  quantity: numeric('quantity').notNull(),
  averageCost: numeric('average_cost').notNull(),
  costCurrency: text('cost_currency').notNull(),
  createdAt: timestamp('created_at', { withTimezone: true }).notNull().defaultNow(),
  updatedAt: timestamp('updated_at', { withTimezone: true }).notNull().defaultNow(),
}, (table) => ({ ownerSymbol: unique().on(table.ownerKey, table.symbol) }))

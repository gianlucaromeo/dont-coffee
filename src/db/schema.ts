import { pgTable, real, serial, timestamp } from "drizzle-orm/pg-core";

export const dailyAssumptionsTable = pgTable("dailyAssumptions", {
  id: serial("id").primaryKey(),
  date: timestamp().notNull().unique(),
  normalCoffees: real().notNull(),
  decafCoffees: real().notNull(),
});

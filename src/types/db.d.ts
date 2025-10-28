import { dailyAssumptionsTable } from "../db/schema";

export type DailyAssumption = typeof dailyAssumptionsTable.$inferSelect;

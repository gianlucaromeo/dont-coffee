import { dailyAssumptionsTable } from "../db/schema";

export type DailyAssumptionDTO = typeof dailyAssumptionsTable.$inferSelect;

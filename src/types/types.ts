import { DailyAssumptionDTO } from "./db-types";

export type Status = 'success' | 'error';

export interface CoffeeData {
  normalCoffees: number;
  decafCoffees: number;
}

export type DailyAssumption = DailyAssumptionDTO & {
  status: Status,
};

export type WeeklyAssumptions = {
  week: number,
  status: Status,
  dailyAssumptions: DailyAssumption[],
}
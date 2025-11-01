import { publicProcedure } from "../../init";
import { dailyAssumptionsTable } from "@/src/db/schema";
import {
  CoffeeData,
  DailyAssumption,
  Status,
  WeeklyAssumptions,
} from "@/src/types/types";
import { TRPCError } from "@trpc/server";

const computeDayStatus = ({
  normalCoffees,
  decafCoffees,
}: CoffeeData): Status => {
  return normalCoffees + decafCoffees > 1.5 ? "error" : "success";
};

function computeWeekStatus(dailyAssumptions: DailyAssumption[]): Status {
  const exceededCount = dailyAssumptions.filter(
    ({ normalCoffees, decafCoffees }) => normalCoffees + decafCoffees > 1.5
  ).length;

  return exceededCount > 1 ? "error" : "success";
}

export const dailyAssumptionsListProcedure = publicProcedure.query(
  async ({ ctx }): Promise<WeeklyAssumptions[]> => {
    try {
      const rows = await ctx.db
        .select()
        .from(dailyAssumptionsTable)
        .orderBy(dailyAssumptionsTable.date);

      // Add daily status
      const all = rows.map((e) => {
        return { ...e, status: computeDayStatus(e) };
      });

      // Group by weeks
      const byWeeks: WeeklyAssumptions[] = [];
      for (let i = 0; i < all.length; i += 7) {
        const days = all.slice(i, i + 7);
        byWeeks.push({
          week: i / 7 + 1,
          status: computeWeekStatus(days),
          dailyAssumptions: days,
        });
      }

      return byWeeks;
    } catch (error) {
      throw new TRPCError({ code: "NOT_FOUND", message: String(error) });
    }
  }
);

import { publicProcedure } from "../../init";
import { dailyAssumptionsTable } from "@/src/db/schema";
import {
  CoffeeData,
  DailyAssumption,
  Status,
  WeeklyAssumptions,
} from "@/src/types/types";
import { TRPCError } from "@trpc/server";
import { and, gte, lte } from "drizzle-orm";
import { z } from "zod";

const computeDayStatus = ({
  normalCoffees,
  decafCoffees,
}: CoffeeData): Status => {
  return normalCoffees + decafCoffees > 1.5 ? "error" : "success";
};

function computeWeekStatus(dailyAssumptions: DailyAssumption[]): Status {
  const exceededCount = dailyAssumptions.filter(
    ({ normalCoffees, decafCoffees }) =>
      (normalCoffees ?? 0) + (decafCoffees ?? 0) > 1.5
  ).length;

  return exceededCount > 1 ? "error" : "success";
}

export const dailyAssumptionsListProcedure = publicProcedure
  .input(
    z
      .object({
        dateFrom: z.date().nullish(),
        dateTo: z.date().nullish(),
      })
      .nullish()
  )
  .query(async ({ ctx, input }): Promise<WeeklyAssumptions[]> => {
    const { dateFrom, dateTo } = { ...input };

    const from = dateFrom || new Date(2025, 0, 1);
    const to = dateTo || new Date();

    try {
      const rows = await ctx.db
        .select()
        .from(dailyAssumptionsTable)
        .where(
          and(
            gte(dailyAssumptionsTable.date, from),
            lte(dailyAssumptionsTable.date, to)
          )
        )
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
          status: computeWeekStatus(days), // Add weekly status
          dailyAssumptions: days,
        });
      }

      // Fill missing week days
      if (byWeeks.length > 0) {
        const lastWeekAssumptions = byWeeks.at(
          byWeeks.length - 1
        )!.dailyAssumptions;

        const firstDate = lastWeekAssumptions.at(0)!.date!;

        for (let i = lastWeekAssumptions.length - 1; i < 6; i++) {
          const date = new Date(
            firstDate.getTime() + (i + 1) * 60000 * 60 * 24
          );

          lastWeekAssumptions.push({
            date: date,
            decafCoffees: 0,
            normalCoffees: 0,
            status: "empty",
          });
        }
      }

      return byWeeks;
    } catch (error) {
      throw new TRPCError({ code: "NOT_FOUND", message: String(error) });
    }
  });

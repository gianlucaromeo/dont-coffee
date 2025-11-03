"use client";

import { useQuery } from "@tanstack/react-query";
import { useAppStore } from "../../zustand/store";
import { WeekCard } from "./week-card";
import { useTRPC } from "../../lib/trpc/client";
import { AppEmpty } from "../common/empty-message";
import { dateToMMDD } from "../../ui-utils";

export function WeeklyAssumptionsGrid() {
  const { dateFrom, dateTo } = useAppStore((s) => s);

  const trpc = useTRPC();

  const { data } = useQuery({
    ...trpc.mock.dailyAssumptions.queryOptions({
      dateFrom: dateFrom,
      dateTo: dateTo,
    }),
  });

  if (!data) {
    return <div>Loading ...</div>;
  }

  if (data.length == 0) {
    return (
      <AppEmpty
        title="Oops! No data found."
        description={`No coffees tracked from ${dateToMMDD(
          dateFrom
        )} to ${dateToMMDD(dateTo)}.`}
      />
    );
  }

  return (
    <div className="w-full h-full overflow-auto">
      <div
        className="h-min
                   grid
                   lg:grid-cols-4 md:grid-cols-3 sm:grid-cols-2 grid-cols-1
                   gap-x-4 gap-y-4"
      >
        {data.map((e) => (
          <WeekCard key={e.week} weeklyData={e} />
        ))}
      </div>
    </div>
  );
}

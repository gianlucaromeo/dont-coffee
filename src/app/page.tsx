import { HydrateClient, prefetch, trpc } from "@/src/app/lib/trpc/server";
import { WeeklyAssumptionsGrid } from "./components/home/weekly-assumptions-grid";
import { DatePickers } from "./components/home/date-pickers";

export default async function Home() {
  prefetch(
    trpc.mock.dailyAssumptions.queryOptions({
      dateFrom: new Date(2025, 0, 1),
      dateTo: new Date(),
    })
  );

  return (
    <HydrateClient>
      <div className="p-12 flex flex-col gap-4 h-dvh max-w-[1300px] mx-auto">
        <DatePickers />
        <WeeklyAssumptionsGrid />
      </div>
    </HydrateClient>
  );
}

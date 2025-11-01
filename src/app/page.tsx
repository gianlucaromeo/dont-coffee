import { HydrateClient, prefetch, trpc } from "@/src/app/lib/trpc/server";
import { WeeklyAssumptionsGrid } from "./components/common/weekly-assumptions-grid";

export default async function Home() {
  prefetch(trpc.mock.dailyAssumptions.queryOptions());

  return (
    <HydrateClient>
      <WeeklyAssumptionsGrid />
    </HydrateClient>
  );
}

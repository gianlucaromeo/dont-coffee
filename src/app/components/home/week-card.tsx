import { WeeklyAssumptions } from "@/src/types/types";
import { StatusIndicator } from "../common/status-indicator";
import { Card, CardHeader, CardTitle, CardContent } from "../shadcn/card";
import { DailyRow } from "./daily-row";

export function WeekCard({ weeklyData }: { weeklyData: WeeklyAssumptions }) {
  return (
    <Card
      className="
          h-min bg-background
          hover:scale-[98%]
        hover:bg-purple-400 hover:border-none
          hover:cursor-pointer **:cursor-pointer
          transition-transform duration-200"
    >
      <CardHeader>
        <CardTitle
          className={`flex flex-row items-center justify-between gap-2 text-4xl tracking-[-0.18rem]`}
        >
          Week {weeklyData.week} <StatusIndicator status={weeklyData.status} />
        </CardTitle>
      </CardHeader>
      <CardContent className="flex flex-col gap-1">
        {weeklyData.dailyAssumptions.map((e) => (
          <DailyRow key={e.date?.toString()} data={e} />
        ))}
      </CardContent>
    </Card>
  );
}

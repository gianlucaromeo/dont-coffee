import { caller } from "@/src/app/lib/trpc/server";
import { dateToMMDD, getStatusColor } from "../../ui-utils";
import { DailyAssumption, Status, WeeklyAssumptions } from "@/src/types/types";
import {
  Card,
  CardAction,
  CardContent,
  CardHeader,
  CardTitle,
} from "../shadcn/card";
import { Label } from "@/src/app/components/shadcn/label";

function StatusRect({ status }: { status: Status }) {
  return (
    <div className={`w-[14px] h-[12px] rounded-xs ${getStatusColor(status)}`} />
  );
}

function DailyData({ data }: { data: DailyAssumption }) {
  return (
    <div className="flex gap-2">
      <StatusRect status={data.status} />
      <Label className="flex-1">{dateToMMDD(data.date)}</Label>
      <Label>
        {data.normalCoffees}, {data.decafCoffees}d
      </Label>
    </div>
  );
}

function WeekCard({ weeklyData }: { weeklyData: WeeklyAssumptions }) {
  return (
    <Card key={weeklyData.week}>
      <CardHeader>
        <CardTitle className="text-3xl">Week {weeklyData.week}</CardTitle>
        <CardAction>
          <StatusRect status={weeklyData.status} />
        </CardAction>
      </CardHeader>
      <CardContent>
        {weeklyData.dailyAssumptions.map((e) => (
          <DailyData key={e.id} data={e} />
        ))}
      </CardContent>
    </Card>
  );
}

export async function WeeklyAssumptionsGrid() {
  const data = await caller.mock.dailyAssumptions();

  return (
    <div className="p-12 h-dvh max-h-dvh">
      <div className="h-full grid lg:grid-cols-3 md:grid-cols-2 sm:grid-cols-2 xs:grid-cols-1 overflow-auto gap-4">
        {data.map((e) => WeekCard({ weeklyData: e }))}
      </div>
    </div>
  );
}

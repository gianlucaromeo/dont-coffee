import { DailyAssumption } from "@/src/types/types";
import { Label } from "@radix-ui/react-label";
import { dateToMMDD } from "../../ui-utils";
import { StatusIndicator } from "../common/status-indicator";

export function DailyRow({ data: dailyAssumption }: { data: DailyAssumption }) {
    return (
      <div
        className={`flex items-center gap-1 ${
          dailyAssumption.status == "empty" && "text-muted-foreground"
        }`}
      >
        <StatusIndicator status={dailyAssumption.status} />
        <Label className="flex-1 text-md">
          {dateToMMDD(dailyAssumption.date)}
        </Label>
        {dailyAssumption.status == "empty" && (
          <Label className="text-md">
            {dailyAssumption.status == "empty" && "-"}
          </Label>
        )}
        {dailyAssumption.status != "empty" && (
          <Label className="text-md">
            {dailyAssumption.normalCoffees}, {dailyAssumption.decafCoffees}d
          </Label>
        )}
      </div>
    );
  }
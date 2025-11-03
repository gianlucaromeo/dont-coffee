import { Status } from "@/src/types/types";
import { getBgStatusColor } from "../../ui-utils";

export function StatusIndicator({
  status,
  full = false,
}: {
  status: Status;
  full?: boolean;
}) {
  return (
    <div
      className={`
          ${getBgStatusColor(status)} 
          ${!full && "h-[12px] w-[14px]"} 
          ${full && "h-[12px] w-full"}
          ${status == "empty" && "border"}
          rounded-xs 
          `}
    />
  );
}

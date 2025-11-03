"use client";

import { useAppStore } from "../../zustand/store";
import { DatePicker } from "../common/date-picker";

export function DatePickers() {
  const { dateFrom, setDateFrom, dateTo, setDateTo } = useAppStore((s) => s);

  return (
    <div className="flex gap-4">
      <DatePicker label="From" date={dateFrom} onDateChanged={setDateFrom} />
      <DatePicker label="To" date={dateTo} onDateChanged={setDateTo} />
    </div>
  );
}

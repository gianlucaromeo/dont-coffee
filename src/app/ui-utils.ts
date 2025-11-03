import { Status } from "../types/types";

export const BG_STATUS_COLORS: Record<Status, string> = {
  success: "bg-green-400",
  error: "bg-red-400",
  empty: 'bg-transparent',
};

export const TEXT_STATUS_COLORS: Record<Status, string> = {
  success: "text-green-400",
  error: "text-red-400",
  empty: 'text-transparent',
};

export const getBgStatusColor = (status: Status): string =>
  BG_STATUS_COLORS[status] ?? "bg-gray-400";

export const getTextStatusColor = (status: Status): string =>
  TEXT_STATUS_COLORS[status] ?? "text-gray-400";

const MONTHS = [
  "January",
  "February",
  "March",
  "April",
  "May",
  "June",
  "July",
  "August",
  "September",
  "October",
  "November",
  "December",
];

export function dateToMMDD(date?: Date): string {
  if (!date) return '';
  const month = date.getMonth();
  const day = date.getDate();
  const formattedDay = day < 10 ? `0${day}` : String(day);
  const formattedMonth = MONTHS[month].slice(0, 3);
  return `${formattedDay} ${formattedMonth}`; // e.g., '01 Jan'
}

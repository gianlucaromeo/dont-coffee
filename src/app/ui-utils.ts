import { Status } from "../types/types";

export const STATUS_COLORS: Record<Status, string> = {
  success: "bg-green-400",
  error: "bg-red-400",
};

export const getStatusColor = (status: Status): string =>
  STATUS_COLORS[status] ?? "bg-gray-300";

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

export function dateToMMDD(date: Date): string {
  const month = date.getMonth();
  const day = date.getDate();
  const formattedDay = day < 10 ? `0${day}` : String(day);
  const formattedMonth = MONTHS[month].slice(0, 3);
  return `${formattedDay} ${formattedMonth}`; // e.g., '01 Jan'
}

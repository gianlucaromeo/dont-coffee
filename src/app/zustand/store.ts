import { create } from "zustand";

interface AppStore {
  dateFrom?: Date;
  setDateFrom: (v?: Date) => void;

  dateTo?: Date;
  setDateTo: (v?: Date) => void;
}

export const useAppStore = create<AppStore>()((set) => ({
  dateFrom: new Date(2025, 0, 1),
  setDateFrom: (v) => set(() => ({ dateFrom: v })),

  dateTo: new Date(),
  setDateTo: (v) => set(() => ({ dateTo: v })),
}));

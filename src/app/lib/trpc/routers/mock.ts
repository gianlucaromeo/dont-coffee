import { createTRPCRouter } from "../init";
import { dailyAssumptionsListProcedure } from "./daily-assumptions/list.proc";

export const mockRouter = createTRPCRouter({
    dailyAssumptions: dailyAssumptionsListProcedure,
})
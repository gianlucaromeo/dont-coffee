import { createTRPCRouter } from "../init";
import { mockRouter } from "./mock";

export const appRouter = createTRPCRouter({
  mock: mockRouter,
});

// export type of router to prevent importing server code on the client
export type AppRouter = typeof appRouter;

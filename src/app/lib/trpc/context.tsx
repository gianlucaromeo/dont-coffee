import { cache } from "react";
import { drizzle } from "drizzle-orm/node-postgres";
import { Pool } from "pg";

export const createTRPCContext = cache(async () => {
  const databaseUrl = process.env.DATABASE_URL;

  if (!databaseUrl) {
    throw new Error("DATABASE_URL is not set");
  }

  const pool = new Pool({
    connectionString: databaseUrl,
  });

  const db = drizzle(pool);

  return { db };
});

export type Context = Awaited<ReturnType<typeof createTRPCContext>>;

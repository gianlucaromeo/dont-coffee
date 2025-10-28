import { drizzle } from "drizzle-orm/node-postgres";
import { Pool } from "pg";

export async function waitForDatabase(
  pool: Pool,
  maxRetries = 30,
  delay = 1000
): Promise<void> {
  for (let i = 0; i < maxRetries; i++) {
    try {
      await pool.query("SELECT 1");
      console.log("✅ Db connection established!");
      return;
    } catch (error) {
      console.log(`⌛️ Waiting for db... (attempt ${i + 1}/${maxRetries})`);

      if (i == maxRetries - 1) {
        throw new Error(
          `😭 Failed to connect to db after ${maxRetries} attempts: ${error}`
        );
      }

      await new Promise((resolve) => setTimeout(resolve, delay));
    }
  }
}

export async function createDatabaseConnection() {
  const databaseUrl = process.env.DATABASE_URL!;
  if (!databaseUrl) {
    throw new Error("DATABASE_URL environment variable not set");
  }

  // Hide password
  console.log(
    `🎬 Connecting to db (${databaseUrl.replace(/:[^:@]*@/, ":****@")})...`
  );

  const pool = new Pool({
    connectionString: databaseUrl,
  });

  try {
    await waitForDatabase(pool);
    const db = drizzle(pool);
    return { db, pool };
  } catch (error) {
    await pool.end();
    throw error;
  }
}

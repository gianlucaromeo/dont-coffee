import fs from "fs";
import path from "path";
import { createDatabaseConnection } from "./database";
import { parse } from "csv-parse/sync";
import { dailyAssumptionsTable } from "@/src/db/schema";
import { count } from "drizzle-orm";

export async function seedDailyAssumptions() {
  const { db, pool } = await createDatabaseConnection();

  try {
    // Read and parse CSV file
    const csvPath = path.join(__dirname, "../data/mock_daily_assumptions.csv");

    console.log(`📄 Reading CSV file: ${csvPath}`);

    if (!fs.existsSync(csvPath)) {
      throw new Error(`CSV not found at ${csvPath}`);
    }

    const csvContent = fs.readFileSync(csvPath, "utf-8");
    const records = parse(csvContent, {
      columns: true,
      skip_empty_lines: true,
    });

    console.log(`📊 Found ${records.length} daily assumptions records in CSV`);

    // (Optional) Clear existing data (uncomment if you want to start fresh)
    // console.log('🧹 Clearing existing daily assumptions...');
    // await db.delete(dailyAssumptionsTable);

    // Insert data in batches for performance
    const batchSize = 150;
    const totalBatches = Math.ceil(records.length / batchSize);

    for (let i = 0; i < records.length; i += batchSize) {
      const batch = records.slice(i, i + batchSize);

      // Transform CSV to match database schema
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      const transformedBatch = batch.map((record: any) => ({
        date: new Date(record.date),
        normalCoffees: parseFloat(record.normalCoffees),
        decafCoffees: parseFloat(record.decafCoffees),
      }));

      const batchNumber = Math.floor(i / batchSize) + 1;

      console.log(
        `Inserting batch ${batchNumber}/${totalBatches} (${transformedBatch.length} records)`
      );

      try {
        await db.insert(dailyAssumptionsTable).values(transformedBatch);
      } catch (error) {
        console.error(
          `❌ Error inserting batch starting at record ${i + 1}`,
          error
        );
        throw error;
      }
    }

    console.log("✅ Successfully inserted all daily assumptions records!");

    const [{ count: totalDailyAssumptions }] = await db
      .select({ count: count() })
      .from(dailyAssumptionsTable);

    console.log(
      `📊 Total daily assumptions in database: ${totalDailyAssumptions}`
    );
  } catch (error) {
    console.error("❌ Error during daily assumptions seeding", error);
    throw error;
  } finally {
    await pool.end();
    console.log("🔌 Database connection closed.");
  }
}

#!/usr/bin/env tsx

import 'dotenv/config';
import { seedDailyAssumptions } from "./mock-daily-assumptions-seeder";

async function main() {
  console.log("🌱 Starting database seeding...");

  try {
    console.log("☕️ Seeding mock daily assumptions...");
    await seedDailyAssumptions();
    console.log("✅ Mock daily assumption seeded succesfully!");

    console.log("🎉 All seeding operations completed succesfully!");
  } catch (error) {
    console.error("❌ Seeding failed: ", error);
    process.exit(1);
  }
}

if (require.main === module) {
  main().catch((error) => {
    console.error("💣 Fatal error during seeding: ", error);
    process.exit(1);
  });
}

export { main as seedDatabase };

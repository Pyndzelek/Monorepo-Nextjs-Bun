import { drizzle } from "drizzle-orm/postgres-js";
import { migrate } from "drizzle-orm/postgres-js/migrator";
import postgres from "postgres";
import path from "path";

const runMigrate = async () => {
  if (!process.env.DATABASE_URL) {
    throw new Error("DATABASE_URL is not set");
  }

  const sql = postgres(process.env.DATABASE_URL, { max: 1 });
  const db = drizzle(sql);

  console.log("Running migrations...");

  const start = Date.now();

  await migrate(db, {
    // This points to where drizzle-kit saves your .sql files
    migrationsFolder: path.join(__dirname, "../drizzle"),
  });

  const end = Date.now();

  console.log(`✅ Migrations completed in ${end - start}ms`);

  await sql.end();
  process.exit(0);
};

runMigrate().catch((err) => {
  console.error("❌ Migration failed");
  console.error(err);
  process.exit(1);
});

import { readdir, readFile } from "fs/promises";
import path from "path";
import { Pool } from "pg";

const migrationsDirectory = path.join(process.cwd(), "sql", "migrations");

async function main() {
  const db = new Pool({
    connectionString:
      process.env.DATABASE_URL ||
      "postgresql://postgres:postgres@127.0.0.1:5432/video_automation",
  });

  await db.query(`
    CREATE TABLE IF NOT EXISTS schema_migrations (
      filename TEXT PRIMARY KEY,
      applied_at TIMESTAMPTZ NOT NULL DEFAULT now()
    );
  `);

  const files = (await readdir(migrationsDirectory))
    .filter((file) => file.endsWith(".sql"))
    .sort();

  for (const file of files) {
    const already = await db.query(
      `SELECT 1 FROM schema_migrations WHERE filename = $1 LIMIT 1`,
      [file],
    );

    if (already.rowCount && already.rowCount > 0) {
      console.log(`[migrate] Skipping already-applied migration ${file}`);
      continue;
    }

    const sql = await readFile(path.join(migrationsDirectory, file), "utf8");
    await db.query(sql);
    await db.query(`INSERT INTO schema_migrations (filename) VALUES ($1)`, [file]);
    console.log(`[migrate] Applied migration ${file}`);
  }

  await db.end();
  console.log("[migrate] All migrations applied successfully.");
}

main().catch((error) => {
  console.error("[migrate] Failed to apply migrations", error);
  process.exitCode = 1;
});

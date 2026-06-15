import { Pool, type PoolConfig } from "pg";

let dbUnavailableLogged = false;

function buildPoolConfig(): PoolConfig {
  const connectionString =
    process.env.DATABASE_URL || "postgresql://postgres:postgres@127.0.0.1:5432/video_automation";

  const config: PoolConfig = { connectionString };

  if (connectionString.includes("neon.tech")) {
    config.ssl = { rejectUnauthorized: false };
  }

  if (process.env.DATABASE_SSL === "1") {
    config.ssl = { rejectUnauthorized: false };
  }

  return config;
}

export const db = new Pool(buildPoolConfig());

db.on("error", (error) => {
  console.error("[db] PostgreSQL pool error", error);
});

export async function isDatabaseAvailable() {
  try {
    await db.query("SELECT 1");
    return true;
  } catch (error) {
    if (!dbUnavailableLogged) {
      dbUnavailableLogged = true;
      console.warn(
        "[db] PostgreSQL is unavailable. Falling back to empty task lists until it is reachable.",
        error,
      );
    }
    return false;
  }
}

export async function isTaskTableReady() {
  const available = await isDatabaseAvailable();
  if (!available) {
    return false;
  }

  try {
    await db.query("SELECT 1 FROM media_tasks LIMIT 0");
    return true;
  } catch {
    console.warn(
      "[db] media_tasks table not found. Please run 'npm run migrate' first.",
    );
    return false;
  }
}

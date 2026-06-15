import { db, isTaskTableReady } from "@/lib/db";
import type { MediaTask } from "@/types/task";

interface MediaTaskRow {
  id: string;
  status: MediaTask["status"];
  progress: number;
  created_at: string;
  updated_at: string;
  started_at: string | null;
  completed_at: string | null;
  error_message: string | null;
  storage_key: string | null;
  storage_path: string | null;
  output_key: string | null;
  retry_count: number;
  max_retries: number;
  last_heartbeat_at: string | null;
  message: string;
  input_json: MediaTask["input"];
  assets_json: MediaTask["assets"];
}

function mapRow(row: MediaTaskRow): MediaTask {
  return {
    id: row.id,
    status: row.status,
    progress: row.progress,
    createdAt: row.created_at,
    updatedAt: row.updated_at,
    startedAt: row.started_at ?? undefined,
    completedAt: row.completed_at ?? undefined,
    errorMessage: row.error_message ?? undefined,
    storageKey: row.storage_key ?? undefined,
    storagePath: row.storage_path ?? undefined,
    outputKey: row.output_key ?? undefined,
    retryCount: row.retry_count,
    maxRetries: row.max_retries,
    lastHeartbeatAt: row.last_heartbeat_at ?? undefined,
    message: row.message,
    input: row.input_json,
    assets: row.assets_json ?? [],
  };
}

export async function listTasks() {
  const ready = await isTaskTableReady();
  if (!ready) {
    return [];
  }

  const result = await db.query<MediaTaskRow>(
    `SELECT * FROM media_tasks ORDER BY created_at DESC`,
  );
  return result.rows.map(mapRow);
}

export async function getTaskById(id: string) {
  const ready = await isTaskTableReady();
  if (!ready) {
    return null;
  }

  const result = await db.query<MediaTaskRow>(
    `SELECT * FROM media_tasks WHERE id = $1 LIMIT 1`,
    [id],
  );
  return result.rows[0] ? mapRow(result.rows[0]) : null;
}

export async function saveTask(task: MediaTask) {
  const ready = await isTaskTableReady();
  if (!ready) {
    throw new Error(
      "PostgreSQL media_tasks table is missing. Please run 'npm run migrate' first.",
    );
  }

  await db.query(
    `
      INSERT INTO media_tasks (
        id, status, progress, created_at, updated_at, started_at, completed_at,
        error_message, storage_key, storage_path, output_key, retry_count,
        max_retries, last_heartbeat_at, message, input_json, assets_json
      ) VALUES (
        $1, $2, $3, $4, $5, $6, $7,
        $8, $9, $10, $11, $12,
        $13, $14, $15, $16, $17
      )
      ON CONFLICT (id) DO UPDATE SET
        status = EXCLUDED.status,
        progress = EXCLUDED.progress,
        updated_at = EXCLUDED.updated_at,
        started_at = EXCLUDED.started_at,
        completed_at = EXCLUDED.completed_at,
        error_message = EXCLUDED.error_message,
        storage_key = EXCLUDED.storage_key,
        storage_path = EXCLUDED.storage_path,
        output_key = EXCLUDED.output_key,
        retry_count = EXCLUDED.retry_count,
        max_retries = EXCLUDED.max_retries,
        last_heartbeat_at = EXCLUDED.last_heartbeat_at,
        message = EXCLUDED.message,
        input_json = EXCLUDED.input_json,
        assets_json = EXCLUDED.assets_json
    `,
    [
      task.id,
      task.status,
      task.progress,
      task.createdAt,
      task.updatedAt,
      task.startedAt ?? null,
      task.completedAt ?? null,
      task.errorMessage ?? null,
      task.storageKey ?? null,
      task.storagePath ?? null,
      task.outputKey ?? null,
      task.retryCount ?? 0,
      task.maxRetries ?? 2,
      task.lastHeartbeatAt ?? null,
      task.message,
      JSON.stringify(task.input),
      JSON.stringify(task.assets),
    ],
  );

  return task;
}

export async function updateTask(updatedTask: MediaTask) {
  await saveTask(updatedTask);
  return updatedTask;
}

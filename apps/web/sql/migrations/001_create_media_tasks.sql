CREATE TABLE IF NOT EXISTS media_tasks (
  id TEXT PRIMARY KEY,
  status TEXT NOT NULL,
  progress INTEGER NOT NULL,
  created_at TIMESTAMPTZ NOT NULL,
  updated_at TIMESTAMPTZ NOT NULL,
  started_at TIMESTAMPTZ,
  completed_at TIMESTAMPTZ,
  error_message TEXT,
  storage_key TEXT,
  storage_path TEXT,
  output_key TEXT,
  retry_count INTEGER NOT NULL DEFAULT 0,
  max_retries INTEGER NOT NULL DEFAULT 2,
  last_heartbeat_at TIMESTAMPTZ,
  message TEXT NOT NULL,
  input_json JSONB NOT NULL,
  assets_json JSONB NOT NULL DEFAULT '[]'::jsonb
);

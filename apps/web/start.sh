#!/bin/sh
set -e

# Start the background worker
echo "[entrypoint] Starting worker..."
node --experimental-strip-types ./scripts/worker.ts &

# Start the Next.js server
echo "[entrypoint] Starting Next.js..."
exec npm run start

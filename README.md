# Video Automation Studio MVP

Browser-based: upload a video → get English subtitles + AI dub + auto-clipped final video.

## One-click deploy (free)

1. Create free accounts on:
   - [Neon](https://neon.tech) — PostgreSQL (0.5 GB free)
   - [Upstash](https://upstash.com) — Redis (256 MB free)
   - [Render](https://render.com) — Web + Worker (750 h/month free)

2. On Neon: create a database named `video_automation`, copy the connection string.
3. On Upstash: create a Redis instance, copy the `REDIS_URL` (starts with `rediss://`).
4. On Render: click **New → Blueprint**, connect this repo, set these env vars:

```
DATABASE_URL = <paste from Neon>
REDIS_URL    = <paste from Upstash>
```

5. Render auto-deploys the web service and the worker. Open the provided URL.

## Run locally

```bash
cd apps/web
npm install
npm run migrate        # requires PostgreSQL
npm run dev            # terminal 1 — web
npm run worker         # terminal 2 — background processor
```

## Architecture

| Layer | Tech | Role |
|-------|------|------|
| Web UI | Next.js | Upload form, task dashboard, video player |
| Queue | BullMQ + Redis | Dispatch task IDs to workers |
| State | PostgreSQL | Task metadata, progress, results |
| Worker | Node.js | FFmpeg, ASR, translation, TTS |
| Media | FFmpeg | Extract audio, render video, burn subtitles |

## AI providers (set in env)

| Provider | `local-fallback` | Real mode |
|----------|-------------------|-----------|
| `ASR_PROVIDER` | Placeholder transcript | `whisper-compatible` |
| `TRANSLATION_PROVIDER` | Placeholder English text | `llm-compatible` |
| `TTS_PROVIDER` | Reuses source audio | `tts-compatible` |

Each has its own `_API_KEY`, `_BASE_URL`, and `_MODEL` env vars. When real provider config is missing, it falls back locally.

## Output artifacts (per task)

- Source video
- Extracted MP3 audio
- Preview MP4 video
- Source transcript JSON
- Translated transcript JSON
- English subtitle file (SRT/VTT)
- English dub audio MP3
- Final English video MP4
- Final English video with burned subtitles MP4
- Metadata JSON

## Verified

```bash
cd apps/web
npm run lint   # passes
npm run build  # passes
```

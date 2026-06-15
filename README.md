# Video Automation Studio MVP

Upload a video in your browser → get English subtitles + AI dub + auto-clipped final video.

## Deploy to Render (1 click)

[![Deploy to Render](https://render.com/images/deploy-to-render-button.svg)](https://render.com/deploy?repo=https://github.com/frfcxc/video-automation)

1. Click the button above
2. Log in with GitHub
3. Render auto-detects everything — click **Approve**. Done.

Your public URL will be ready in ~5 minutes. Open it and upload a video.

## Architecture

| Layer | Tech |
|-------|------|
| Web + API | Next.js |
| Queue | BullMQ + Redis |
| State | PostgreSQL |
| Worker | Node.js with FFmpeg |
| Output | English subtitles, dub audio, final MP4 |

## AI Providers

Set via env vars on Render. When missing, falls back to local placeholders:

| Var | Fallback | Real Mode |
|-----|----------|-----------|
| `ASR_PROVIDER` | `local-fallback` | `whisper-compatible` |
| `TRANSLATION_PROVIDER` | `local-fallback` | `llm-compatible` |
| `TTS_PROVIDER` | `local-fallback` | `tts-compatible` |

## Run locally

```bash
cd apps/web
npm install
npm run migrate
npm run dev       # terminal 1
npm run worker    # terminal 2
```

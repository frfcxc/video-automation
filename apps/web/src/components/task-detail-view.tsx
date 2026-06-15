"use client";

import { VideoPlayer } from "@/components/video-player";
import Link from "next/link";
import type { MediaTask } from "@/types/task";

const statusStyles: Record<MediaTask["status"], string> = {
  queued: "bg-amber-400/15 text-amber-100 border-amber-300/30",
  uploading: "bg-sky-400/15 text-sky-100 border-sky-300/30",
  processing: "bg-violet-400/15 text-violet-100 border-violet-300/30",
  completed: "bg-emerald-400/15 text-emerald-100 border-emerald-300/30",
  failed: "bg-rose-400/15 text-rose-100 border-rose-300/30",
};

interface TaskDetailViewProps {
  task: MediaTask;
}

export function TaskDetailView({ task }: TaskDetailViewProps) {
  const sourceAsset = task.assets.find((asset) => asset.kind === "source");
  const finalVideoAsset = task.assets.find(
    (asset) => asset.kind === "video" && asset.label.toLowerCase().includes("final"),
  );
  const burnedVideoAsset = task.assets.find(
    (asset) => asset.kind === "video" && asset.label.toLowerCase().includes("burned"),
  );
  const subtitleAsset = task.assets.find((asset) => asset.kind === "subtitle");
  const dubAudioAsset = task.assets.find((asset) => asset.kind === "dub-audio");
  const otherAssets = task.assets.filter(
    (asset) =>
      !["source", "subtitle", "dub-audio"].includes(asset.kind) &&
      asset !== finalVideoAsset &&
      asset !== burnedVideoAsset,
  );

  return (
    <section className="mx-auto flex w-full max-w-7xl flex-col gap-10 px-6 py-10 lg:px-10 lg:py-16">
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div className="space-y-2">
          <Link
            href="/"
            className="text-xs text-cyan-200/70 hover:text-cyan-100"
          >
            ← Back to dashboard
          </Link>
          <div className="flex flex-wrap items-center gap-3">
            <h1 className="text-2xl font-semibold text-white sm:text-3xl">
              {task.input.fileName}
            </h1>
            <span
              className={`rounded-full border px-3 py-1 text-xs font-medium uppercase tracking-[0.2em] ${statusStyles[task.status]}`}
            >
              {task.status}
            </span>
          </div>
          <p className="text-sm leading-6 text-slate-300">{task.message}</p>
        </div>

        <div className="min-w-52 space-y-2 rounded-3xl border border-white/10 bg-white/5 p-4">
          <div className="flex items-center justify-between text-sm text-slate-300">
            <span>Progress</span>
            <span>{task.progress}%</span>
          </div>
          <div className="h-3 overflow-hidden rounded-full bg-white/10">
            <div
              className="h-full rounded-full bg-gradient-to-r from-cyan-300 via-sky-400 to-violet-400"
              style={{ width: `${task.progress}%` }}
            />
          </div>
          <div className="flex flex-wrap gap-x-4 gap-y-1 text-xs text-slate-500">
            <span>Mode: {task.input.clipMode}</span>
            <span>Source lang: {task.input.translation.sourceLanguage}</span>
          </div>
          {task.id ? <div className="text-xs text-slate-600">ID: {task.id}</div> : null}
        </div>
      </div>

      {task.status === "failed" && task.errorMessage ? (
        <div className="rounded-[2rem] border border-rose-400/20 bg-rose-950/20 p-6 text-sm text-rose-200">
          <p className="font-semibold text-rose-100">Error</p>
          <p>{task.errorMessage}</p>
        </div>
      ) : null}

      {sourceAsset || finalVideoAsset || burnedVideoAsset ? (
        <div className="grid gap-8 lg:grid-cols-2">
          {sourceAsset ? (
            <VideoPlayer
              src={sourceAsset.url}
              label="Original source video"
            />
          ) : null}

          {burnedVideoAsset ? (
            <VideoPlayer
              src={burnedVideoAsset.url}
              label="Final English video (burned subtitles)"
              subtitleSrc={subtitleAsset?.url}
            />
          ) : finalVideoAsset ? (
            <VideoPlayer
              src={finalVideoAsset.url}
              label="Final English video"
              subtitleSrc={subtitleAsset?.url}
            />
          ) : null}
        </div>
      ) : null}

      {dubAudioAsset ? (
        <div className="rounded-[2rem] border border-white/10 bg-white/5 p-5">
          <p className="mb-3 text-sm font-medium text-slate-300">English dub audio</p>
          <audio
            src={dubAudioAsset.url}
            controls
            preload="metadata"
            className="w-full"
          />
        </div>
      ) : null}

      {subtitleAsset ? (
        <div className="rounded-[2rem] border border-white/10 bg-white/5 p-5">
          <p className="mb-3 text-sm font-medium text-slate-300">English subtitle preview</p>
          <iframe
            src={subtitleAsset.url}
            className="h-40 w-full rounded-xl border border-white/10 bg-slate-950 text-sm text-slate-200"
            title="Subtitle content"
          />
        </div>
      ) : null}

      {otherAssets.length ? (
        <div className="rounded-[2rem] border border-white/10 bg-white/5 p-5">
          <p className="mb-3 text-sm font-medium text-slate-300">All generated assets</p>
          <div className="flex flex-wrap gap-3">
            {otherAssets.map((asset, index) => (
              <a
                key={`${asset.kind}-${index}`}
                href={asset.url}
                className="rounded-full border border-cyan-300/20 bg-cyan-300/5 px-4 py-2 text-sm text-cyan-100 hover:bg-cyan-300/10"
              >
                {asset.label}
              </a>
            ))}
          </div>
        </div>
      ) : null}
    </section>
  );
}

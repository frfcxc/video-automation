"use client";

import { useMemo, useState } from "react";
import type { MediaTask } from "@/types/task";
import { createTask, fetchTasks } from "@/lib/api";
import { TaskList } from "@/components/task-list";
import type { ClipMode, MediaTaskInput } from "@/types/task";

const clipModeOptions: Array<{ value: ClipMode; label: string; description: string }> = [
  {
    value: "subtitle-driven",
    label: "Subtitle-driven",
    description: "Trim silences and tighten scenes based on speech timing.",
  },
  {
    value: "template",
    label: "Template",
    description: "Apply a preset intro/outro/music package for fast exports.",
  },
  {
    value: "hybrid",
    label: "Hybrid",
    description: "Use subtitle-aware trimming first, then render with a template.",
  },
];

const defaultInput: MediaTaskInput = {
  fileName: "",
  fileSize: 0,
  clipMode: "hybrid",
  clipRules: {
    removeSilence: true,
    trimFillerWords: true,
    maxSegmentSeconds: 18,
    minSegmentSeconds: 3,
  },
  template: {
    templateId: "clean-product-launch",
    includeIntro: true,
    includeOutro: true,
    includeBackgroundMusic: true,
  },
  translation: {
    sourceLanguage: "zh",
    targetLanguage: "en",
    keepOriginalAudioBed: false,
    subtitleFormat: "srt",
  },
  voice: {
    provider: "demo-tts",
    voiceId: "alloy-en-female",
    speakingRate: 1,
  },
};

interface UploadFormProps {
  initialTasks: MediaTask[];
}

export function UploadForm({ initialTasks }: UploadFormProps) {
  const [input, setInput] = useState<MediaTaskInput>(defaultInput);
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [status, setStatus] = useState<string | null>(null);
  const [tasks, setTasks] = useState<MediaTask[]>(initialTasks);

  const selectedMode = useMemo(
    () => clipModeOptions.find((option) => option.value === input.clipMode),
    [input.clipMode],
  );

  async function refreshTasks() {
    try {
      const nextTasks = await fetchTasks();
      setTasks(nextTasks);
    } catch {
      // ignore refresh failures in the client helper
    }
  }

  async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();

    if (!selectedFile) {
      setStatus("Please choose a video file before creating a task.");
      return;
    }

    setIsSubmitting(true);
    setStatus(null);

    try {
      const task = await createTask(selectedFile, {
        ...input,
        fileName: selectedFile.name,
        fileSize: selectedFile.size,
      });
      setStatus("Video uploaded and queued. The Redis worker will pick it up asynchronously.");
      setTasks((current) => [task, ...current]);
      setSelectedFile(null);
      setInput(defaultInput);
      event.currentTarget.reset();
      void refreshTasks();
    } catch (error) {
      setStatus(error instanceof Error ? error.message : "Failed to create task.");
    } finally {
      setIsSubmitting(false);
    }
  }

  return (
    <div className="space-y-8">
      <form
        onSubmit={handleSubmit}
        className="space-y-8 rounded-[2rem] border border-white/10 bg-white/5 p-8 shadow-2xl shadow-cyan-950/20 backdrop-blur"
      >
        <div className="space-y-3">
          <p className="text-sm font-medium uppercase tracking-[0.3em] text-cyan-200/80">
            Create a processing job
          </p>
          <h2 className="text-2xl font-semibold text-white">Upload a source video</h2>
          <p className="max-w-2xl text-sm leading-7 text-slate-300">
            This version uploads a real video file, queues the task in Redis, and lets the
            background worker process it asynchronously.
          </p>
        </div>

        <div className="grid gap-6 md:grid-cols-2">
          <label className="space-y-2 text-sm text-slate-200 md:col-span-2">
            <span>Video file</span>
            <input
              required
              type="file"
              accept="video/*"
              onChange={(event) => {
                const file = event.target.files?.[0] ?? null;
                setSelectedFile(file);
                setInput((current) => ({
                  ...current,
                  fileName: file?.name ?? "",
                  fileSize: file?.size ?? 0,
                }));
              }}
              className="w-full rounded-2xl border border-dashed border-white/20 bg-slate-950/60 px-4 py-4 text-white file:mr-4 file:rounded-full file:border-0 file:bg-cyan-300 file:px-4 file:py-2 file:text-sm file:font-semibold file:text-slate-950"
            />
            {selectedFile ? (
              <p className="text-xs text-slate-400">
                Selected: {selectedFile.name} · {(selectedFile.size / 1024 / 1024).toFixed(2)} MB
              </p>
            ) : null}
          </label>

          <label className="space-y-2 text-sm text-slate-200">
            <span>Duration (seconds)</span>
            <input
              type="number"
              min={1}
              value={input.durationSeconds ?? ""}
              onChange={(event) =>
                setInput((current) => ({
                  ...current,
                  durationSeconds: event.target.value ? Number(event.target.value) : undefined,
                }))
              }
              className="w-full rounded-2xl border border-white/10 bg-slate-950/60 px-4 py-3 text-white outline-none placeholder:text-slate-500"
              placeholder="94"
            />
          </label>

          <label className="space-y-2 text-sm text-slate-200">
            <span>Source language</span>
            <input
              value={input.translation.sourceLanguage}
              onChange={(event) =>
                setInput((current) => ({
                  ...current,
                  translation: {
                    ...current.translation,
                    sourceLanguage: event.target.value,
                  },
                }))
              }
              className="w-full rounded-2xl border border-white/10 bg-slate-950/60 px-4 py-3 text-white outline-none placeholder:text-slate-500"
              placeholder="zh"
            />
          </label>
        </div>

        <div className="grid gap-4 lg:grid-cols-3">
          {clipModeOptions.map((option) => {
            const active = option.value === input.clipMode;
            return (
              <button
                key={option.value}
                type="button"
                onClick={() => setInput((current) => ({ ...current, clipMode: option.value }))}
                className={`rounded-3xl border px-5 py-5 text-left transition ${
                  active
                    ? "border-cyan-300 bg-cyan-400/10 shadow-lg shadow-cyan-400/10"
                    : "border-white/10 bg-slate-950/40 hover:border-cyan-400/40 hover:bg-slate-900/80"
                }`}
              >
                <p className="text-base font-semibold text-white">{option.label}</p>
                <p className="mt-2 text-sm leading-6 text-slate-300">{option.description}</p>
              </button>
            );
          })}
        </div>

        <div className="grid gap-6 lg:grid-cols-2">
          <div className="space-y-4 rounded-3xl border border-white/10 bg-slate-950/40 p-5">
            <h3 className="text-lg font-semibold text-white">Clip rules</h3>
            <div className="grid gap-4 sm:grid-cols-2">
              <label className="space-y-2 text-sm text-slate-200">
                <span>Min segment (s)</span>
                <input
                  type="number"
                  min={1}
                  max={30}
                  value={input.clipRules.minSegmentSeconds}
                  onChange={(event) =>
                    setInput((current) => ({
                      ...current,
                      clipRules: {
                        ...current.clipRules,
                        minSegmentSeconds: Number(event.target.value),
                      },
                    }))
                  }
                  className="w-full rounded-2xl border border-white/10 bg-slate-900 px-4 py-3 text-white"
                />
              </label>
              <label className="space-y-2 text-sm text-slate-200">
                <span>Max segment (s)</span>
                <input
                  type="number"
                  min={5}
                  max={120}
                  value={input.clipRules.maxSegmentSeconds}
                  onChange={(event) =>
                    setInput((current) => ({
                      ...current,
                      clipRules: {
                        ...current.clipRules,
                        maxSegmentSeconds: Number(event.target.value),
                      },
                    }))
                  }
                  className="w-full rounded-2xl border border-white/10 bg-slate-900 px-4 py-3 text-white"
                />
              </label>
            </div>
            <div className="flex flex-wrap gap-4 text-sm text-slate-200">
              <label className="inline-flex items-center gap-2">
                <input
                  type="checkbox"
                  checked={input.clipRules.removeSilence}
                  onChange={(event) =>
                    setInput((current) => ({
                      ...current,
                      clipRules: {
                        ...current.clipRules,
                        removeSilence: event.target.checked,
                      },
                    }))
                  }
                />
                Remove silence
              </label>
              <label className="inline-flex items-center gap-2">
                <input
                  type="checkbox"
                  checked={input.clipRules.trimFillerWords}
                  onChange={(event) =>
                    setInput((current) => ({
                      ...current,
                      clipRules: {
                        ...current.clipRules,
                        trimFillerWords: event.target.checked,
                      },
                    }))
                  }
                />
                Trim filler words
              </label>
            </div>
          </div>

          <div className="space-y-4 rounded-3xl border border-white/10 bg-slate-950/40 p-5">
            <h3 className="text-lg font-semibold text-white">Dub + subtitle settings</h3>
            <div className="grid gap-4 sm:grid-cols-2">
              <label className="space-y-2 text-sm text-slate-200">
                <span>Voice</span>
                <input
                  value={input.voice.voiceId}
                  onChange={(event) =>
                    setInput((current) => ({
                      ...current,
                      voice: {
                        ...current.voice,
                        voiceId: event.target.value,
                      },
                    }))
                  }
                  className="w-full rounded-2xl border border-white/10 bg-slate-900 px-4 py-3 text-white"
                />
              </label>
              <label className="space-y-2 text-sm text-slate-200">
                <span>Speaking rate</span>
                <input
                  type="number"
                  min={0.7}
                  max={1.3}
                  step={0.05}
                  value={input.voice.speakingRate}
                  onChange={(event) =>
                    setInput((current) => ({
                      ...current,
                      voice: {
                        ...current.voice,
                        speakingRate: Number(event.target.value),
                      },
                    }))
                  }
                  className="w-full rounded-2xl border border-white/10 bg-slate-900 px-4 py-3 text-white"
                />
              </label>
            </div>
            <label className="inline-flex items-center gap-2 text-sm text-slate-200">
              <input
                type="checkbox"
                checked={input.translation.keepOriginalAudioBed}
                onChange={(event) =>
                  setInput((current) => ({
                    ...current,
                    translation: {
                      ...current.translation,
                      keepOriginalAudioBed: event.target.checked,
                    },
                  }))
                }
              />
              Keep original audio as a background bed
            </label>
            <div className="rounded-2xl border border-cyan-400/20 bg-cyan-400/5 px-4 py-3 text-sm leading-6 text-cyan-100">
              <p className="font-medium text-cyan-50">Current mode</p>
              <p>{selectedMode?.description}</p>
            </div>
          </div>
        </div>

        <div className="flex flex-col gap-3 border-t border-white/10 pt-6 sm:flex-row sm:items-center sm:justify-between">
          <div className="text-sm text-slate-400">
            Target output: English subtitles + English AI voice track.
          </div>
          <button
            disabled={isSubmitting}
            className="inline-flex items-center justify-center rounded-full bg-cyan-300 px-6 py-3 text-sm font-semibold text-slate-950 transition hover:bg-cyan-200 disabled:cursor-not-allowed disabled:bg-cyan-900"
          >
            {isSubmitting ? "Queueing task..." : "Upload and queue video"}
          </button>
        </div>

        {status ? <p className="text-sm text-cyan-100">{status}</p> : null}
      </form>

      <section className="space-y-5">
        <div className="flex flex-col gap-2 sm:flex-row sm:items-end sm:justify-between">
          <div>
            <p className="text-sm uppercase tracking-[0.3em] text-cyan-100/80">Queued jobs</p>
            <h2 className="text-2xl font-semibold text-white">Processing dashboard</h2>
          </div>
          <p className="text-sm text-slate-400">
            Task details now live in PostgreSQL, while Redis handles background queue delivery.
          </p>
        </div>

        <TaskList tasks={tasks} />
      </section>
    </div>
  );
}

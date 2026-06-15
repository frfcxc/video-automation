import type { MediaTask } from "@/types/task";

const statusStyles: Record<MediaTask["status"], string> = {
  queued: "bg-amber-400/15 text-amber-100 border-amber-300/30",
  uploading: "bg-sky-400/15 text-sky-100 border-sky-300/30",
  processing: "bg-violet-400/15 text-violet-100 border-violet-300/30",
  completed: "bg-emerald-400/15 text-emerald-100 border-emerald-300/30",
  failed: "bg-rose-400/15 text-rose-100 border-rose-300/30",
};

interface TaskListProps {
  tasks: MediaTask[];
}

export function TaskList({ tasks }: TaskListProps) {
  if (!tasks.length) {
    return (
      <div className="rounded-[2rem] border border-dashed border-white/10 bg-white/5 p-8 text-sm text-slate-300">
        No tasks yet. Create your first media job above.
      </div>
    );
  }

  return (
    <div className="grid gap-5">
      {tasks.map((task) => (
        <a key={task.id} href={`/tasks/${task.id}`} className="block">
          <article className="rounded-[2rem] border border-white/10 bg-white/5 p-6 shadow-lg shadow-slate-950/10 backdrop-blur transition hover:border-cyan-400/20 hover:bg-white/[0.07]">
            <div className="flex flex-col gap-4 lg:flex-row lg:items-start lg:justify-between">
              <div className="space-y-3">
                <div className="flex flex-wrap items-center gap-3">
                  <h3 className="text-xl font-semibold text-white">{task.input.fileName}</h3>
                  <span
                    className={`rounded-full border px-3 py-1 text-xs font-medium uppercase tracking-[0.2em] ${statusStyles[task.status]}`}
                  >
                    {task.status}
                  </span>
                </div>
                <p className="text-sm leading-6 text-slate-300">{task.message}</p>
                <div className="flex flex-wrap gap-2 text-xs text-slate-400">
                  <span>Mode: {task.input.clipMode}</span>
                  <span>•</span>
                  <span>Source: {task.input.translation.sourceLanguage}</span>
                  <span>•</span>
                  <span>Target: English dub + subtitles</span>
                  <span>•</span>
                  <span>Template: {task.input.template.templateId}</span>
                </div>
              </div>

              <div className="min-w-52 space-y-2 rounded-3xl border border-white/10 bg-slate-950/40 p-4">
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
                <div className="text-xs text-slate-500">
                  {task.status === "completed" ? "View details →" : `ID: ${task.id}`}
                </div>
              </div>
            </div>

            {task.assets.length ? (
              <div className="mt-5 flex flex-wrap gap-3 border-t border-white/10 pt-5">
                {task.assets.slice(0, 4).map((asset, index) => (
                  <span
                    key={`${task.id}-${asset.kind}-${index}`}
                    className="rounded-full border border-cyan-300/20 bg-cyan-300/5 px-4 py-2 text-sm text-cyan-100"
                  >
                    {asset.label}
                  </span>
                ))}
                {task.assets.length > 4 ? (
                  <span className="rounded-full border border-cyan-300/20 bg-cyan-300/5 px-4 py-2 text-sm text-cyan-200/60">
                    +{task.assets.length - 4} more
                  </span>
                ) : null}
              </div>
            ) : null}
          </article>
        </a>
      ))}
    </div>
  );
}

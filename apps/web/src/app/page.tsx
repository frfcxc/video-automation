import { UploadForm } from "@/components/upload-form";
import { listTasks } from "@/lib/demo-store";

const metrics = [
  {
    value: "4-step",
    label: "pipeline",
    description: "Transcribe → translate → dub → render",
  },
  {
    value: "2 modes",
    label: "auto edit",
    description: "Subtitle-driven trimming + template rendering",
  },
  {
    value: "Web-first",
    label: "delivery",
    description: "Cloud-deployable UI with async worker processing",
  },
];

export default async function Home() {
  const tasks = await listTasks().catch(() => []);

  return (
    <main className="min-h-screen bg-[radial-gradient(circle_at_top,_rgba(34,211,238,0.16),_transparent_32%),linear-gradient(180deg,_#020617_0%,_#0f172a_52%,_#111827_100%)] text-white">
      <section className="mx-auto flex w-full max-w-7xl flex-col gap-16 px-6 py-10 lg:px-10 lg:py-16">
        <div className="grid gap-10 lg:grid-cols-[1.2fr_0.8fr] lg:items-end">
          <div className="space-y-6">
            <p className="inline-flex rounded-full border border-cyan-300/20 bg-cyan-300/10 px-4 py-2 text-xs font-medium uppercase tracking-[0.35em] text-cyan-100">
              Video automation MVP
            </p>
            <div className="space-y-5">
              <h1 className="max-w-4xl text-4xl font-semibold tracking-tight text-white sm:text-5xl lg:text-6xl">
                自动剪辑、视频翻译、英文配音和字幕，一站式网页工作台
              </h1>
              <p className="max-w-3xl text-base leading-8 text-slate-300 sm:text-lg">
                This starter turns your approved plan into a browser-first product shell: queue
                video jobs, configure automated editing rules, and prepare a worker pipeline for
                English subtitles and AI dubbing.
              </p>
            </div>
          </div>

          <div className="grid gap-4 sm:grid-cols-3 lg:grid-cols-1">
            {metrics.map((metric) => (
              <div
                key={metric.label}
                className="rounded-[2rem] border border-white/10 bg-white/5 p-5 backdrop-blur"
              >
                <div className="text-2xl font-semibold text-white">{metric.value}</div>
                <div className="mt-1 text-xs uppercase tracking-[0.3em] text-cyan-100/80">
                  {metric.label}
                </div>
                <p className="mt-3 text-sm leading-6 text-slate-300">{metric.description}</p>
              </div>
            ))}
          </div>
        </div>

        <UploadForm initialTasks={tasks} />
      </section>
    </main>
  );
}

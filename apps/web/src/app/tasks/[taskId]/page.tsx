import { getTaskById } from "@/lib/demo-store";
import Link from "next/link";
import { TaskDetailView } from "@/components/task-detail-view";
import type { Metadata } from "next";

interface PageProps {
  params: Promise<{ taskId: string }>;
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { taskId } = await params;
  const task = await getTaskById(taskId);
  return {
    title: task ? `Task: ${task.input.fileName}` : "Task not found",
  };
}

export default async function TaskDetailPage({ params }: PageProps) {
  const { taskId } = await params;
  const task = await getTaskById(taskId);

  if (!task) {
    return (
      <main className="flex min-h-screen items-center justify-center bg-slate-950">
        <div className="space-y-4 text-center">
          <h1 className="text-2xl font-semibold text-white">Task not found</h1>
          <p className="text-slate-400">The requested task does not exist or has been removed.</p>
          <Link
            href="/"
            className="inline-block rounded-full bg-cyan-300 px-5 py-2 text-sm font-semibold text-slate-950"
          >
            Back to dashboard
          </Link>
        </div>
      </main>
    );
  }

  return (
    <main className="min-h-screen bg-[radial-gradient(circle_at_top,_rgba(34,211,238,0.12),_transparent_30%),linear-gradient(180deg,_#020617_0%,_#0f172a_52%,_#111827_100%)] text-white">
      <TaskDetailView task={task} />
    </main>
  );
}

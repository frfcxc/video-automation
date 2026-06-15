import type { MediaTask } from "@/types/task";
export {
  getTaskById,
  listTasks,
  saveTask,
  updateTask,
} from "@/lib/task-store";

export async function getNextQueuedTask() {
  const { listTasks } = await import("@/lib/task-store");
  const tasks = await listTasks();
  return tasks.find((task: MediaTask) => task.status === "queued") ?? null;
}

export async function recoverStaleProcessingTasks(staleBeforeIso: string) {
  const { listTasks, updateTask } = await import("@/lib/task-store");
  const tasks = await listTasks();
  const recoveredTasks: MediaTask[] = [];

  for (const task of tasks) {
    if (task.status !== "processing") {
      recoveredTasks.push(task);
      continue;
    }

    const heartbeat = task.lastHeartbeatAt || task.startedAt || task.updatedAt;
    if (!heartbeat || heartbeat >= staleBeforeIso) {
      recoveredTasks.push(task);
      continue;
    }

    const retryCount = task.retryCount ?? 0;
    const maxRetries = task.maxRetries ?? 2;
    const canRetry = retryCount < maxRetries;

    const nextTask: MediaTask = canRetry
      ? {
          ...task,
          status: "queued",
          progress: 5,
          updatedAt: new Date().toISOString(),
          message:
            "Recovered a stale processing task and re-queued it for another worker attempt.",
        }
      : {
          ...task,
          status: "failed",
          progress: 100,
          updatedAt: new Date().toISOString(),
          completedAt: new Date().toISOString(),
          errorMessage:
            "Task exceeded retry budget after becoming stale during processing.",
          message:
            "Task marked failed after stale processing timeout and retry exhaustion.",
        };

    await updateTask(nextTask);
    recoveredTasks.push(nextTask);
  }

  return recoveredTasks;
}

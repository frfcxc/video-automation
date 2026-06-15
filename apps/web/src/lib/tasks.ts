import { randomUUID } from "crypto";
import { getTaskById, saveTask, updateTask } from "@/lib/demo-store";
import type { MediaTask } from "@/types/task";
import type { CreateTaskInput } from "@/types/schema";

export async function createDemoTask(
  input: CreateTaskInput,
  storageKey?: string,
  storagePath?: string,
): Promise<MediaTask> {
  const now = new Date().toISOString();

  const task: MediaTask = {
    id: `task_${randomUUID()}`,
    status: "queued",
    progress: 5,
    createdAt: now,
    updatedAt: now,
    retryCount: 0,
    maxRetries: 2,
    input,
    message: "Task queued. Waiting for the background worker to start processing.",
    assets: [],
    storageKey,
    storagePath,
  };

  return saveTask(task);
}

export async function markTaskProgress(
  task: MediaTask,
  patch: Partial<
    Pick<
      MediaTask,
      | "status"
      | "progress"
      | "message"
      | "assets"
      | "outputKey"
      | "errorMessage"
      | "startedAt"
      | "completedAt"
      | "retryCount"
      | "lastHeartbeatAt"
    >
  >,
) {
  const updatedTask: MediaTask = {
    ...task,
    ...patch,
    assets: patch.assets ?? task.assets,
    updatedAt: new Date().toISOString(),
  };

  return updateTask(updatedTask);
}

export async function claimQueuedTask(taskId: string) {
  const task = await getTaskById(taskId);
  if (!task || task.status !== "queued") {
    return null;
  }

  return markTaskProgress(task, {
    status: "processing",
    progress: 15,
    startedAt: task.startedAt || new Date().toISOString(),
    lastHeartbeatAt: new Date().toISOString(),
    retryCount: (task.retryCount ?? 0) + 1,
    errorMessage: undefined,
    message: "Background worker claimed the task and started media processing.",
  });
}

export async function refreshTaskHeartbeat(taskId: string) {
  const task = await getTaskById(taskId);
  if (!task || task.status !== "processing") {
    return null;
  }

  return markTaskProgress(task, {
    lastHeartbeatAt: new Date().toISOString(),
  });
}

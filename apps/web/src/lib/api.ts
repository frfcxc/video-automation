import type { MediaTask } from "@/types/task";
import type { CreateTaskInput } from "@/types/schema";

const TASKS_ENDPOINT = "/api/tasks";

export async function fetchTasks(): Promise<MediaTask[]> {
  const response = await fetch(TASKS_ENDPOINT, {
    cache: "no-store",
  });

  if (!response.ok) {
    throw new Error("Failed to fetch tasks");
  }

  const data = (await response.json()) as { tasks: MediaTask[] };
  return data.tasks;
}

export async function createTask(
  file: File,
  input: CreateTaskInput,
): Promise<MediaTask> {
  const formData = new FormData();
  formData.append("file", file);
  formData.append("config", JSON.stringify(input));

  const response = await fetch(TASKS_ENDPOINT, {
    method: "POST",
    body: formData,
  });

  if (!response.ok) {
    throw new Error("Failed to create task");
  }

  const data = (await response.json()) as { task: MediaTask };
  return data.task;
}

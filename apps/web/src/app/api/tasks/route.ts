import { mkdir, writeFile } from "fs/promises";
import path from "path";
import { listTasks, updateTask } from "@/lib/demo-store";
import { isRedisAvailable, mediaQueue } from "@/lib/queue";
import { createDemoTask } from "@/lib/tasks";
import { createTaskFormSchema, createTaskSchema } from "@/types/schema";

const uploadsDirectory = path.join(process.cwd(), ".data", "uploads");
const outputsDirectory = path.join(process.cwd(), ".data", "outputs");

async function ensureDirectories() {
  await Promise.all([
    mkdir(uploadsDirectory, { recursive: true }),
    mkdir(outputsDirectory, { recursive: true }),
  ]);
}

async function persistUpload(file: File, taskIdHint: string) {
  await ensureDirectories();
  const fileBuffer = Buffer.from(await file.arrayBuffer());
  const safeName = file.name.replace(/[^a-zA-Z0-9._-]/g, "-");
  const storageKey = `${taskIdHint}-${safeName}`;
  const storagePath = path.join(uploadsDirectory, storageKey);
  await writeFile(storagePath, fileBuffer);
  return { storageKey, storagePath };
}

export async function GET() {
  return Response.json({ tasks: await listTasks() });
}

export async function POST(request: Request) {
  const formData = await request.formData();
  const parsedForm = createTaskFormSchema.safeParse({
    file: formData.get("file"),
    config: formData.get("config"),
  });

  if (!parsedForm.success) {
    return Response.json(
      {
        error: "Invalid upload payload",
        details: parsedForm.error.flatten(),
      },
      { status: 400 },
    );
  }

  const config = JSON.parse(parsedForm.data.config) as unknown;
  const parsedConfig = createTaskSchema.safeParse(config);

  if (!parsedConfig.success) {
    return Response.json(
      {
        error: "Invalid task config",
        details: parsedConfig.error.flatten(),
      },
      { status: 400 },
    );
  }

  const seedTask = await createDemoTask(parsedConfig.data);
  const { storageKey, storagePath } = await persistUpload(parsedForm.data.file, seedTask.id);

  const task = await updateTask({
    ...seedTask,
    storageKey,
    storagePath,
    status: "queued",
    progress: 10,
    updatedAt: new Date().toISOString(),
    message: "Task queued. Waiting for the Redis worker to start processing.",
  });

  const redisReady = await isRedisAvailable();
  if (!redisReady) {
    return Response.json(
      {
        error: "Redis is unavailable. The task was saved, but it could not be queued yet.",
        task,
      },
      { status: 503 },
    );
  }

  await mediaQueue.add(
    `task:${task.id}`,
    { taskId: task.id },
    {
      jobId: task.id,
    },
  );

  return Response.json({ task }, { status: 201 });
}

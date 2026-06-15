import path from "path";
import { Worker } from "bullmq";
import { getRedisConnectionOptions, mediaQueueName } from "@/lib/queue";
import { runQueuedTask } from "@/lib/task-runner";

const outputsDirectory = path.join(process.cwd(), ".data", "outputs");
const workerConcurrency = Number(process.env.WORKER_CONCURRENCY || 1);

const worker = new Worker(
  mediaQueueName,
  async (job) => {
    const taskId = String(job.data.taskId || "");
    if (!taskId) {
      throw new Error("Queue job is missing taskId.");
    }

    console.log(`[worker] Processing queued task ${taskId}`);
    await runQueuedTask({ taskId, outputsDirectory });
  },
  {
    connection: getRedisConnectionOptions(),
    concurrency: workerConcurrency,
  },
);

worker.on("completed", (job) => {
  console.log(`[worker] Completed job ${job.id}`);
});

worker.on("failed", (job, error) => {
  console.error(`[worker] Job ${job?.id ?? "unknown"} failed`, error);
});

console.log(`[worker] BullMQ worker started for queue ${mediaQueueName}`);

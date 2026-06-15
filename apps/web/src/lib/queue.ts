import { Queue } from "bullmq";

let redisUnavailableLogged = false;

export const mediaQueueName = "media-processing";

export function getRedisConnectionOptions() {
  const redisUrl = process.env.REDIS_URL || "redis://127.0.0.1:6379";

  const options: Record<string, unknown> = {
    maxRetriesPerRequest: null as null,
  };

  if (redisUrl.startsWith("rediss://") || redisUrl.includes("upstash.io")) {
    return {
      url: redisUrl,
      ...options,
      tls: {},
    };
  }

  return {
    url: redisUrl,
    ...options,
  };
}

export const mediaQueue = new Queue(mediaQueueName, {
  connection: getRedisConnectionOptions(),
  defaultJobOptions: {
    attempts: Number(process.env.WORKER_MAX_ATTEMPTS || 3),
    removeOnComplete: 100,
    removeOnFail: 100,
    backoff: {
      type: "exponential",
      delay: Number(process.env.WORKER_RETRY_DELAY_MS || 5000),
    },
  },
});

export async function isRedisAvailable() {
  try {
    await mediaQueue.waitUntilReady();
    return true;
  } catch (error) {
    if (!redisUnavailableLogged) {
      redisUnavailableLogged = true;
      console.warn(
        "[queue] Redis is unavailable. Queue operations will fail until it is reachable.",
        error,
      );
    }
    return false;
  }
}

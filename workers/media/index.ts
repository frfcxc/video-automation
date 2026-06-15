import { processVideoTask } from "./jobs/process-video";
import type { MediaTask } from "../packages/shared/task";

const demoTask: MediaTask = {
  id: "task_worker_demo",
  status: "queued",
  progress: 0,
  createdAt: new Date().toISOString(),
  updatedAt: new Date().toISOString(),
  message: "Demo worker task",
  input: {
    fileName: "demo.mp4",
    fileSize: 18_000_000,
    durationSeconds: 48,
    clipMode: "hybrid",
    clipRules: {
      removeSilence: true,
      trimFillerWords: true,
      maxSegmentSeconds: 15,
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
  },
  assets: [],
};

async function main() {
  const result = await processVideoTask(demoTask);
  console.log(JSON.stringify(result, null, 2));
}

main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});

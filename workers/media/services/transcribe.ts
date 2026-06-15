import type { TranscriptSegment } from "../../packages/shared/media";
import type { MediaTask } from "../../packages/shared/task";

export interface WorkerContext {
  workspaceRoot: string;
  jobDirectory: string;
}

export async function transcribeAudio(task: MediaTask): Promise<TranscriptSegment[]> {
  console.log(`[transcribe] Starting ASR for ${task.id} (${task.input.fileName})`);

  return [
    {
      start: 0,
      end: 4.5,
      text: "欢迎来到我们最新的产品展示视频。",
      confidence: 0.98,
    },
    {
      start: 4.5,
      end: 10,
      text: "今天我们会快速介绍材料、结构和定制能力。",
      confidence: 0.95,
    },
  ];
}

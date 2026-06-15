import path from "path";
import type { VoiceAsset } from "../../packages/shared/media";
import type { MediaTask } from "../../packages/shared/task";
import type { TranslatedSegment } from "./translate";

export async function synthesizeEnglishDub(
  task: MediaTask,
  segments: TranslatedSegment[],
  outputDirectory: string,
): Promise<VoiceAsset> {
  console.log(
    `[tts] Synthesizing ${segments.length} translated segments with voice ${task.input.voice.voiceId}`,
  );

  return {
    voiceId: task.input.voice.voiceId,
    language: "en",
    audioPath: path.join(outputDirectory, `${task.id}.dub.wav`),
  };
}

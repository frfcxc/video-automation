import path from "path";
import type { RenderArtifacts, SubtitleCue, VoiceAsset } from "../../packages/shared/media";
import type { MediaTask } from "../../packages/shared/task";
import type { ClipDecision } from "./clip-rules";
import type { RenderTemplatePlan } from "./templates";

export async function renderFinalVideo(params: {
  task: MediaTask;
  clips: ClipDecision[];
  subtitles: SubtitleCue[];
  dub: VoiceAsset;
  templatePlan: RenderTemplatePlan;
  outputDirectory: string;
}): Promise<RenderArtifacts> {
  const { task, clips, subtitles, dub, templatePlan, outputDirectory } = params;

  console.log(
    `[ffmpeg] Rendering ${task.id} with ${clips.length} clips, ${subtitles.length} subtitles, template ${templatePlan.templateId}, dub ${dub.audioPath}`,
  );

  return {
    subtitlePath: path.join(outputDirectory, `${task.id}.en.srt`),
    dubAudioPath: dub.audioPath,
    finalVideoPath: path.join(outputDirectory, `${task.id}.final.mp4`),
  };
}

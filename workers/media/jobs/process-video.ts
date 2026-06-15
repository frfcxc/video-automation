import path from "path";
import { buildClipPlan } from "../services/clip-rules";
import { renderFinalVideo } from "../services/ffmpeg";
import { buildEnglishSubtitles } from "../services/subtitles";
import { buildTemplatePlan } from "../services/templates";
import { transcribeAudio } from "../services/transcribe";
import { synthesizeEnglishDub } from "../services/tts";
import { translateTranscript } from "../services/translate";
import type { MediaTask } from "../../packages/shared/task";

export async function processVideoTask(task: MediaTask) {
  const outputDirectory = path.join(process.cwd(), "tmp", task.id);

  console.log(`[worker] Processing ${task.id} (${task.input.fileName})`);

  const transcript = await transcribeAudio(task);
  const translated = await translateTranscript(transcript);
  const subtitles = buildEnglishSubtitles(translated);
  const clipPlan = buildClipPlan(transcript, task.input.clipRules);
  const templatePlan = buildTemplatePlan(task.input.template, clipPlan);
  const dub = await synthesizeEnglishDub(task, translated, outputDirectory);
  const artifacts = await renderFinalVideo({
    task,
    clips: clipPlan,
    subtitles,
    dub,
    templatePlan,
    outputDirectory,
  });

  return {
    transcript,
    translated,
    subtitles,
    clipPlan,
    templatePlan,
    dub,
    artifacts,
  };
}

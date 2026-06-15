import { getTaskById } from "@/lib/demo-store";
import { processVideoWithFfmpeg } from "@/lib/media-processing";
import { claimQueuedTask, markTaskProgress, refreshTaskHeartbeat } from "@/lib/tasks";
import type { MediaAsset, MediaTask } from "@/types/task";

interface RunQueuedTaskParams {
  taskId: string;
  outputsDirectory: string;
}

function buildAssets(
  task: MediaTask,
  storageKey: string,
  result: Awaited<ReturnType<typeof processVideoWithFfmpeg>>,
): MediaAsset[] {
  return [
    {
      kind: "source",
      label: "Uploaded source video",
      url: `/api/files/${storageKey}`,
    },
    {
      kind: "audio",
      label: "Extracted audio (MP3)",
      url: `/api/files/${result.audioKey}?type=output`,
    },
    {
      kind: "video",
      label: "Preview video (MP4)",
      url: `/api/files/${result.previewKey}?type=output`,
    },
    {
      kind: "transcript",
      label: "Source transcript (JSON)",
      url: `/api/files/${result.transcriptKey}?type=output`,
    },
    {
      kind: "transcript",
      label: "Translated transcript (JSON)",
      url: `/api/files/${result.translatedTranscriptKey}?type=output`,
    },
    {
      kind: "subtitle",
      label: `English subtitle file (${task.input.translation.subtitleFormat.toUpperCase()})`,
      url: `/api/files/${result.subtitleKey}?type=output`,
    },
    {
      kind: "dub-audio",
      label: "English dub audio (MP3)",
      url: `/api/files/${result.dubAudioKey}?type=output`,
    },
    {
      kind: "video",
      label: "Final English video (MP4)",
      url: `/api/files/${result.finalVideoKey}?type=output`,
    },
    {
      kind: "video",
      label: "Final English video with burned subtitles (MP4)",
      url: `/api/files/${result.finalBurnedVideoKey}?type=output`,
    },
    {
      kind: "metadata",
      label: "Media metadata (JSON)",
      url: `/api/files/${result.metadataKey}?type=output`,
    },
  ];
}

export async function runQueuedTask({ taskId, outputsDirectory }: RunQueuedTaskParams) {
  const task = await getTaskById(taskId);
  if (!task) {
    return null;
  }

  const claimedTask = await claimQueuedTask(task.id);
  if (!claimedTask) {
    return null;
  }

  if (!claimedTask.storagePath || !claimedTask.storageKey) {
    return markTaskProgress(claimedTask, {
      status: "failed",
      progress: 100,
      completedAt: new Date().toISOString(),
      errorMessage: "Task is missing storage metadata for background processing.",
      message: "Background worker could not find the uploaded source file metadata.",
    });
  }

  try {
    await refreshTaskHeartbeat(claimedTask.id);

    const result = await processVideoWithFfmpeg({
      taskId: claimedTask.id,
      sourcePath: claimedTask.storagePath,
      originalFileName: claimedTask.input.fileName,
      outputsDirectory,
      sourceLanguage: claimedTask.input.translation.sourceLanguage,
      subtitleFormat: claimedTask.input.translation.subtitleFormat,
    });

    return markTaskProgress(claimedTask, {
      status: "completed",
      progress: 100,
      completedAt: new Date().toISOString(),
      lastHeartbeatAt: new Date().toISOString(),
      outputKey: result.finalBurnedVideoKey,
      errorMessage: undefined,
      message:
        `Background worker finished successfully. Transcript provider: ${result.transcriptProvider}. Translation provider: ${result.translationProvider}. TTS provider: ${result.ttsProvider}.`,
      assets: buildAssets(claimedTask, claimedTask.storageKey, result),
    });
  } catch (error) {
    return markTaskProgress(claimedTask, {
      status: "failed",
      progress: 100,
      completedAt: new Date().toISOString(),
      lastHeartbeatAt: new Date().toISOString(),
      errorMessage: error instanceof Error ? error.message : "Unknown processing error.",
      message:
        error instanceof Error
          ? `Background worker failed: ${error.message}`
          : "Background worker failed.",
    });
  }
}

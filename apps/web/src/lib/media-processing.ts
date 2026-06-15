import { copyFile, mkdir, readFile, writeFile } from "fs/promises";
import path from "path";
import { spawn } from "child_process";

interface ProcessMediaParams {
  taskId: string;
  sourcePath: string;
  originalFileName: string;
  outputsDirectory: string;
  sourceLanguage: string;
  subtitleFormat: "srt" | "vtt";
}

interface ProbeStream {
  codec_type?: string;
  codec_name?: string;
  width?: number;
  height?: number;
  duration?: string;
  sample_rate?: string;
  channels?: number;
}

interface ProbeFormat {
  filename?: string;
  duration?: string;
  size?: string;
  bit_rate?: string;
  format_name?: string;
}

interface WhisperSegment {
  start?: number;
  end?: number;
  text?: string;
  avg_logprob?: number;
}

interface WhisperResponse {
  language?: string;
  text?: string;
  segments?: WhisperSegment[];
}

interface ChatMessage {
  role: string;
  content: string;
}

interface LlmCompatibleResponse {
  choices?: Array<{
    message?: {
      content?: string;
    };
  }>;
}

export interface TranscriptSegment {
  start: number;
  end: number;
  text: string;
  confidence?: number;
}

export interface ProbeResult {
  streams?: ProbeStream[];
  format?: ProbeFormat;
}

export interface MediaProcessingResult {
  audioKey: string;
  previewKey: string;
  metadataKey: string;
  transcriptKey: string;
  translatedTranscriptKey: string;
  subtitleKey: string;
  dubAudioKey: string;
  finalVideoKey: string;
  finalBurnedVideoKey: string;
  probe: ProbeResult;
  transcript: TranscriptSegment[];
  translatedTranscript: TranscriptSegment[];
  transcriptProvider: string;
  translationProvider: string;
  ttsProvider: string;
}

function getFfmpegBinary() {
  return process.env.FFMPEG_BINARY || "ffmpeg";
}

function getFfprobeBinary() {
  return process.env.FFPROBE_BINARY || "ffprobe";
}

function getTranscriptProvider() {
  return process.env.ASR_PROVIDER || "local-fallback";
}

function getAsrApiKey() {
  return process.env.ASR_API_KEY || "";
}

function getAsrBaseUrl() {
  return process.env.ASR_BASE_URL || "";
}

function getAsrModel() {
  return process.env.ASR_MODEL || "whisper-1";
}

function getTranslationProvider() {
  return process.env.TRANSLATION_PROVIDER || "local-fallback";
}

function getTranslationApiKey() {
  return process.env.TRANSLATION_API_KEY || "";
}

function getTranslationBaseUrl() {
  return process.env.TRANSLATION_BASE_URL || "";
}

function getTranslationModel() {
  return process.env.TRANSLATION_MODEL || "gpt-4o-mini";
}

function getTtsProvider() {
  return process.env.TTS_PROVIDER || "local-fallback";
}

function getTtsApiKey() {
  return process.env.TTS_API_KEY || "";
}

function getTtsBaseUrl() {
  return process.env.TTS_BASE_URL || "";
}

function getTtsModel() {
  return process.env.TTS_MODEL || "gpt-4o-mini-tts";
}

function getTtsVoice() {
  return process.env.TTS_VOICE || "alloy";
}

function getSubtitleBurnFontDir() {
  return process.env.SUBTITLE_BURN_FONT_DIR || "";
}

function escapeSubtitleFilterPath(filePath: string) {
  return filePath.replace(/\\/g, "/").replace(/:/g, "\\:").replace(/'/g, "\\'");
}

function buildSubtitleFilter(subtitlePath: string) {
  const escapedSubtitlePath = escapeSubtitleFilterPath(subtitlePath);
  const fontDir = getSubtitleBurnFontDir().trim();

  if (fontDir) {
    const escapedFontDir = escapeSubtitleFilterPath(fontDir);
    return `subtitles='${escapedSubtitlePath}':fontsdir='${escapedFontDir}'`;
  }

  return `subtitles='${escapedSubtitlePath}'`;
}

function runCommand(command: string, args: string[]) {
  return new Promise<void>((resolve, reject) => {
    const child = spawn(command, args, {
      stdio: ["ignore", "pipe", "pipe"],
      windowsHide: true,
    });

    let stderr = "";
    let stdout = "";

    child.stdout.on("data", (chunk) => {
      stdout += chunk.toString();
    });

    child.stderr.on("data", (chunk) => {
      stderr += chunk.toString();
    });

    child.on("error", (error) => {
      reject(error);
    });

    child.on("close", (code) => {
      if (code === 0) {
        resolve();
        return;
      }

      reject(new Error(`${command} exited with code ${code}\n${stderr || stdout}`));
    });
  });
}

function runJsonCommand(command: string, args: string[]) {
  return new Promise<ProbeResult>((resolve, reject) => {
    const child = spawn(command, args, {
      stdio: ["ignore", "pipe", "pipe"],
      windowsHide: true,
    });

    let stdout = "";
    let stderr = "";

    child.stdout.on("data", (chunk) => {
      stdout += chunk.toString();
    });

    child.stderr.on("data", (chunk) => {
      stderr += chunk.toString();
    });

    child.on("error", (error) => {
      reject(error);
    });

    child.on("close", (code) => {
      if (code !== 0) {
        reject(new Error(`${command} exited with code ${code}\n${stderr || stdout}`));
        return;
      }

      try {
        resolve(JSON.parse(stdout) as ProbeResult);
      } catch (error) {
        reject(error);
      }
    });
  });
}

function safeBaseName(fileName: string) {
  return fileName.replace(/[^a-zA-Z0-9._-]/g, "-");
}

function toSeconds(value: string | undefined) {
  if (!value) {
    return 0;
  }

  const seconds = Number(value);
  return Number.isFinite(seconds) ? seconds : 0;
}

function buildFallbackTranscriptSegments(
  originalFileName: string,
  sourceLanguage: string,
  probe: ProbeResult,
): TranscriptSegment[] {
  const duration = Math.max(toSeconds(probe.format?.duration), 6);
  const midpoint = Math.max(3, Math.min(duration / 2, duration - 2));

  return [
    {
      start: 0,
      end: Number(midpoint.toFixed(2)),
      text: `Detected ${sourceLanguage} speech content for ${originalFileName}.`,
      confidence: 0.6,
    },
    {
      start: Number(midpoint.toFixed(2)),
      end: Number(duration.toFixed(2)),
      text: "Local fallback transcript segment generated from FFprobe duration.",
      confidence: 0.52,
    },
  ];
}

function mapWhisperSegments(
  response: WhisperResponse,
  probe: ProbeResult,
): TranscriptSegment[] {
  if (response.segments?.length) {
    return response.segments
      .filter((segment) => segment.text?.trim())
      .map((segment) => ({
        start: Number((segment.start ?? 0).toFixed(2)),
        end: Number((segment.end ?? segment.start ?? 0).toFixed(2)),
        text: segment.text?.trim() || "",
        confidence:
          typeof segment.avg_logprob === "number"
            ? Number(Math.max(0, Math.min(1, 1 + segment.avg_logprob)).toFixed(2))
            : undefined,
      }))
      .filter((segment) => segment.text.length > 0 && segment.end >= segment.start);
  }

  const fullText = response.text?.trim();
  if (fullText) {
    return [
      {
        start: 0,
        end: Number(Math.max(toSeconds(probe.format?.duration), 1).toFixed(2)),
        text: fullText,
      },
    ];
  }

  return [];
}

function buildFallbackEnglishTranscript(
  transcript: TranscriptSegment[],
): TranscriptSegment[] {
  return transcript.map((segment) => ({
    ...segment,
    text: `English placeholder: ${segment.text}`,
  }));
}

function parseTranslatedLines(content: string) {
  return content
    .split("\n")
    .map((line) => line.trim())
    .filter(Boolean)
    .map((line) => line.replace(/^\d+\.\s*/, ""));
}

function mapTranslatedTranscript(
  source: TranscriptSegment[],
  translatedLines: string[],
): TranscriptSegment[] {
  return source.map((segment, index) => ({
    ...segment,
    text: translatedLines[index] || `English placeholder: ${segment.text}`,
  }));
}

async function transcribeWithWhisperCompatible(params: {
  audioPath: string;
  sourceLanguage: string;
  probe: ProbeResult;
}): Promise<TranscriptSegment[]> {
  const apiKey = getAsrApiKey();
  const baseUrl = getAsrBaseUrl();

  if (!apiKey || !baseUrl) {
    throw new Error("ASR_API_KEY or ASR_BASE_URL is missing for whisper-compatible transcription.");
  }

  const audioBuffer = await readFile(params.audioPath);
  const formData = new FormData();
  formData.append(
    "file",
    new Blob([audioBuffer], { type: "audio/mpeg" }),
    path.basename(params.audioPath),
  );
  formData.append("model", getAsrModel());
  formData.append("response_format", "verbose_json");
  formData.append("timestamp_granularities[]", "segment");
  formData.append("language", params.sourceLanguage);

  const response = await fetch(`${baseUrl.replace(/\/$/, "")}/audio/transcriptions`, {
    method: "POST",
    headers: {
      Authorization: `Bearer ${apiKey}`,
    },
    body: formData,
  });

  if (!response.ok) {
    throw new Error(`ASR request failed with status ${response.status}`);
  }

  const payload = (await response.json()) as WhisperResponse;
  const transcript = mapWhisperSegments(payload, params.probe);

  if (!transcript.length) {
    throw new Error("ASR provider returned no usable transcript segments.");
  }

  return transcript;
}

async function translateWithLlmCompatible(params: {
  transcript: TranscriptSegment[];
  sourceLanguage: string;
}): Promise<TranscriptSegment[]> {
  const apiKey = getTranslationApiKey();
  const baseUrl = getTranslationBaseUrl();

  if (!apiKey || !baseUrl) {
    throw new Error(
      "TRANSLATION_API_KEY or TRANSLATION_BASE_URL is missing for llm-compatible translation.",
    );
  }

  const transcriptText = params.transcript
    .map((segment, index) => `${index + 1}. ${segment.text}`)
    .join("\n");

  const messages: ChatMessage[] = [
    {
      role: "system",
      content:
        "You translate subtitle lines into concise natural English. Return only one translated line per input line, preserving order and count. Do not add commentary.",
    },
    {
      role: "user",
      content: `Translate the following ${params.sourceLanguage} subtitle lines into English:\n${transcriptText}`,
    },
  ];

  const response = await fetch(`${baseUrl.replace(/\/$/, "")}/chat/completions`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${apiKey}`,
    },
    body: JSON.stringify({
      model: getTranslationModel(),
      messages,
      temperature: 0.2,
    }),
  });

  if (!response.ok) {
    throw new Error(`Translation request failed with status ${response.status}`);
  }

  const payload = (await response.json()) as LlmCompatibleResponse;
  const content = payload.choices?.[0]?.message?.content?.trim();

  if (!content) {
    throw new Error("Translation provider returned empty content.");
  }

  const translatedLines = parseTranslatedLines(content);
  if (!translatedLines.length) {
    throw new Error("Translation provider returned no usable translated lines.");
  }

  return mapTranslatedTranscript(params.transcript, translatedLines);
}

async function synthesizeWithTtsCompatible(params: {
  translatedTranscript: TranscriptSegment[];
  dubAudioPath: string;
}): Promise<void> {
  const apiKey = getTtsApiKey();
  const baseUrl = getTtsBaseUrl();

  if (!apiKey || !baseUrl) {
    throw new Error("TTS_API_KEY or TTS_BASE_URL is missing for tts-compatible synthesis.");
  }

  const input = params.translatedTranscript.map((segment) => segment.text).join(" ");
  const response = await fetch(`${baseUrl.replace(/\/$/, "")}/audio/speech`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${apiKey}`,
    },
    body: JSON.stringify({
      model: getTtsModel(),
      voice: getTtsVoice(),
      input,
      format: "mp3",
    }),
  });

  if (!response.ok) {
    throw new Error(`TTS request failed with status ${response.status}`);
  }

  const audioBuffer = Buffer.from(await response.arrayBuffer());
  await writeFile(params.dubAudioPath, audioBuffer);
}

async function transcribeWithProvider(params: {
  audioPath: string;
  originalFileName: string;
  sourceLanguage: string;
  probe: ProbeResult;
}): Promise<{ provider: string; transcript: TranscriptSegment[] }> {
  const provider = getTranscriptProvider();

  if (provider === "local-fallback") {
    return {
      provider,
      transcript: buildFallbackTranscriptSegments(
        params.originalFileName,
        params.sourceLanguage,
        params.probe,
      ),
    };
  }

  if (provider === "whisper-compatible") {
    try {
      return {
        provider,
        transcript: await transcribeWithWhisperCompatible({
          audioPath: params.audioPath,
          sourceLanguage: params.sourceLanguage,
          probe: params.probe,
        }),
      };
    } catch {
      return {
        provider: `${provider} (fallback)`,
        transcript: buildFallbackTranscriptSegments(
          params.originalFileName,
          params.sourceLanguage,
          params.probe,
        ),
      };
    }
  }

  return {
    provider: `${provider} (fallback)`,
    transcript: buildFallbackTranscriptSegments(
      params.originalFileName,
      params.sourceLanguage,
      params.probe,
    ),
  };
}

async function translateWithProvider(params: {
  transcript: TranscriptSegment[];
  sourceLanguage: string;
}): Promise<{ provider: string; translatedTranscript: TranscriptSegment[] }> {
  const provider = getTranslationProvider();

  if (provider === "local-fallback") {
    return {
      provider,
      translatedTranscript: buildFallbackEnglishTranscript(params.transcript),
    };
  }

  if (provider === "llm-compatible") {
    try {
      return {
        provider,
        translatedTranscript: await translateWithLlmCompatible({
          transcript: params.transcript,
          sourceLanguage: params.sourceLanguage,
        }),
      };
    } catch {
      return {
        provider: `${provider} (fallback)`,
        translatedTranscript: buildFallbackEnglishTranscript(params.transcript),
      };
    }
  }

  return {
    provider: `${provider} (fallback)`,
    translatedTranscript: buildFallbackEnglishTranscript(params.transcript),
  };
}

async function synthesizeWithProvider(params: {
  sourceAudioPath: string;
  translatedTranscript: TranscriptSegment[];
  dubAudioPath: string;
}): Promise<{ provider: string }> {
  const provider = getTtsProvider();

  if (provider === "local-fallback") {
    await copyFile(params.sourceAudioPath, params.dubAudioPath);
    return { provider };
  }

  if (provider === "tts-compatible") {
    try {
      await synthesizeWithTtsCompatible({
        translatedTranscript: params.translatedTranscript,
        dubAudioPath: params.dubAudioPath,
      });
      return { provider };
    } catch {
      await copyFile(params.sourceAudioPath, params.dubAudioPath);
      return { provider: `${provider} (fallback)` };
    }
  }

  await copyFile(params.sourceAudioPath, params.dubAudioPath);
  return { provider: `${provider} (fallback)` };
}

function formatTimestamp(seconds: number, format: "srt" | "vtt") {
  const totalMilliseconds = Math.max(0, Math.round(seconds * 1000));
  const hours = Math.floor(totalMilliseconds / 3_600_000)
    .toString()
    .padStart(2, "0");
  const minutes = Math.floor((totalMilliseconds % 3_600_000) / 60_000)
    .toString()
    .padStart(2, "0");
  const secs = Math.floor((totalMilliseconds % 60_000) / 1000)
    .toString()
    .padStart(2, "0");
  const millis = (totalMilliseconds % 1000).toString().padStart(3, "0");
  const delimiter = format === "srt" ? "," : ".";

  return `${hours}:${minutes}:${secs}${delimiter}${millis}`;
}

function buildSubtitleContent(
  transcript: TranscriptSegment[],
  format: "srt" | "vtt",
) {
  const blocks = transcript.map((segment, index) => {
    const timeRange = `${formatTimestamp(segment.start, format)} --> ${formatTimestamp(
      segment.end,
      format,
    )}`;

    if (format === "srt") {
      return `${index + 1}\n${timeRange}\n${segment.text}`;
    }

    return `${timeRange}\n${segment.text}`;
  });

  return format === "vtt" ? `WEBVTT\n\n${blocks.join("\n\n")}` : `${blocks.join("\n\n")}\n`;
}

export async function processVideoWithFfmpeg({
  taskId,
  sourcePath,
  originalFileName,
  outputsDirectory,
  sourceLanguage,
  subtitleFormat,
}: ProcessMediaParams): Promise<MediaProcessingResult> {
  await mkdir(outputsDirectory, { recursive: true });

  const safeName = safeBaseName(originalFileName);
  const audioKey = `${taskId}-${safeName}.audio.mp3`;
  const previewKey = `${taskId}-${safeName}.preview.mp4`;
  const transcriptKey = `${taskId}-${safeName}.transcript.json`;
  const translatedTranscriptKey = `${taskId}-${safeName}.translated-transcript.json`;
  const subtitleKey = `${taskId}-${safeName}.captions.${subtitleFormat}`;
  const dubAudioKey = `${taskId}-${safeName}.dub.mp3`;
  const finalVideoKey = `${taskId}-${safeName}.final.en.mp4`;
  const finalBurnedVideoKey = `${taskId}-${safeName}.final.en.burned.mp4`;
  const metadataKey = `${taskId}-${safeName}.metadata.json`;

  const audioPath = path.join(outputsDirectory, audioKey);
  const previewPath = path.join(outputsDirectory, previewKey);
  const transcriptPath = path.join(outputsDirectory, transcriptKey);
  const translatedTranscriptPath = path.join(outputsDirectory, translatedTranscriptKey);
  const subtitlePath = path.join(outputsDirectory, subtitleKey);
  const dubAudioPath = path.join(outputsDirectory, dubAudioKey);
  const finalVideoPath = path.join(outputsDirectory, finalVideoKey);
  const finalBurnedVideoPath = path.join(outputsDirectory, finalBurnedVideoKey);
  const metadataPath = path.join(outputsDirectory, metadataKey);

  const probe = await runJsonCommand(getFfprobeBinary(), [
    "-v",
    "error",
    "-show_streams",
    "-show_format",
    "-of",
    "json",
    sourcePath,
  ]);

  await runCommand(getFfmpegBinary(), [
    "-y",
    "-i",
    sourcePath,
    "-vn",
    "-acodec",
    "libmp3lame",
    "-b:a",
    "192k",
    audioPath,
  ]);

  await runCommand(getFfmpegBinary(), [
    "-y",
    "-i",
    sourcePath,
    "-c:v",
    "libx264",
    "-preset",
    "veryfast",
    "-crf",
    "24",
    "-c:a",
    "aac",
    "-b:a",
    "128k",
    "-movflags",
    "+faststart",
    previewPath,
  ]);

  const transcriptResult = await transcribeWithProvider({
    audioPath,
    originalFileName,
    sourceLanguage,
    probe,
  });
  const translationResult = await translateWithProvider({
    transcript: transcriptResult.transcript,
    sourceLanguage,
  });
  const ttsResult = await synthesizeWithProvider({
    sourceAudioPath: audioPath,
    translatedTranscript: translationResult.translatedTranscript,
    dubAudioPath,
  });
  const subtitleContent = buildSubtitleContent(
    translationResult.translatedTranscript,
    subtitleFormat,
  );

  await runCommand(getFfmpegBinary(), [
    "-y",
    "-i",
    previewPath,
    "-i",
    dubAudioPath,
    "-map",
    "0:v:0",
    "-map",
    "1:a:0",
    "-c:v",
    "copy",
    "-c:a",
    "aac",
    "-shortest",
    finalVideoPath,
  ]);

  await writeFile(subtitlePath, subtitleContent, "utf8");

  await runCommand(getFfmpegBinary(), [
    "-y",
    "-i",
    finalVideoPath,
    "-vf",
    buildSubtitleFilter(subtitlePath),
    "-c:v",
    "libx264",
    "-preset",
    "veryfast",
    "-crf",
    "24",
    "-c:a",
    "copy",
    finalBurnedVideoPath,
  ]);

  await writeFile(transcriptPath, JSON.stringify(transcriptResult.transcript, null, 2), "utf8");
  await writeFile(
    translatedTranscriptPath,
    JSON.stringify(translationResult.translatedTranscript, null, 2),
    "utf8",
  );
  await writeFile(
    metadataPath,
    JSON.stringify(
      {
        taskId,
        sourcePath,
        originalFileName,
        sourceLanguage,
        subtitleFormat,
        transcriptProvider: transcriptResult.provider,
        translationProvider: translationResult.provider,
        ttsProvider: ttsResult.provider,
        generatedAt: new Date().toISOString(),
        probe,
        transcript: transcriptResult.transcript,
        translatedTranscript: translationResult.translatedTranscript,
        audioKey,
        previewKey,
        transcriptKey,
        translatedTranscriptKey,
        subtitleKey,
        dubAudioKey,
        finalVideoKey,
        finalBurnedVideoKey,
      },
      null,
      2,
    ),
    "utf8",
  );

  return {
    audioKey,
    previewKey,
    transcriptKey,
    translatedTranscriptKey,
    subtitleKey,
    dubAudioKey,
    finalVideoKey,
    finalBurnedVideoKey,
    metadataKey,
    probe,
    transcript: transcriptResult.transcript,
    translatedTranscript: translationResult.translatedTranscript,
    transcriptProvider: transcriptResult.provider,
    translationProvider: translationResult.provider,
    ttsProvider: ttsResult.provider,
  };
}

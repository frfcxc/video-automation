export type TaskStatus =
  | "queued"
  | "uploading"
  | "processing"
  | "completed"
  | "failed";

export type ClipMode = "subtitle-driven" | "template" | "hybrid";
export type SubtitleFormat = "srt" | "vtt";
export type TranslationTarget = "en";

export interface ClipRules {
  removeSilence: boolean;
  trimFillerWords: boolean;
  maxSegmentSeconds: number;
  minSegmentSeconds: number;
}

export interface TemplateOptions {
  templateId: string;
  includeIntro: boolean;
  includeOutro: boolean;
  includeBackgroundMusic: boolean;
}

export interface TranslationOptions {
  sourceLanguage: string;
  targetLanguage: TranslationTarget;
  keepOriginalAudioBed: boolean;
  subtitleFormat: SubtitleFormat;
}

export interface VoiceOptions {
  provider: string;
  voiceId: string;
  speakingRate: number;
}

export interface MediaTaskInput {
  fileName: string;
  fileSize: number;
  durationSeconds?: number;
  clipMode: ClipMode;
  clipRules: ClipRules;
  template: TemplateOptions;
  translation: TranslationOptions;
  voice: VoiceOptions;
}

export interface MediaAsset {
  kind:
    | "source"
    | "transcript"
    | "subtitle"
    | "dub-audio"
    | "audio"
    | "metadata"
    | "video";
  url: string;
  label: string;
}

export interface MediaTask {
  id: string;
  status: TaskStatus;
  progress: number;
  createdAt: string;
  updatedAt: string;
  startedAt?: string;
  completedAt?: string;
  errorMessage?: string;
  storagePath?: string;
  retryCount?: number;
  maxRetries?: number;
  lastHeartbeatAt?: string;
  input: MediaTaskInput;
  message: string;
  assets: MediaAsset[];
  storageKey?: string;
  outputKey?: string;
}

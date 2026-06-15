export interface TranscriptSegment {
  start: number;
  end: number;
  text: string;
  confidence?: number;
}

export interface SubtitleCue {
  start: number;
  end: number;
  text: string;
}

export interface VoiceAsset {
  voiceId: string;
  language: string;
  audioPath: string;
}

export interface RenderArtifacts {
  transcriptPath?: string;
  subtitlePath?: string;
  dubAudioPath?: string;
  previewVideoPath?: string;
  finalVideoPath?: string;
}

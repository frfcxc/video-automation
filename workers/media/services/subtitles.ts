import type { SubtitleCue } from "../../packages/shared/media";
import type { TranslatedSegment } from "./translate";

export function buildEnglishSubtitles(segments: TranslatedSegment[]): SubtitleCue[] {
  console.log(`[subtitles] Building ${segments.length} English subtitle cues`);

  return segments.map((segment) => ({
    start: segment.start,
    end: segment.end,
    text: segment.translatedText,
  }));
}

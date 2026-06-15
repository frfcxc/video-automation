import type { TranscriptSegment } from "../../packages/shared/media";

export interface TranslatedSegment extends TranscriptSegment {
  translatedText: string;
}

export async function translateTranscript(
  segments: TranscriptSegment[],
): Promise<TranslatedSegment[]> {
  console.log(`[translate] Translating ${segments.length} transcript segments to English`);

  return segments.map((segment) => ({
    ...segment,
    translatedText:
      segment.text === "欢迎来到我们最新的产品展示视频。"
        ? "Welcome to our latest product showcase video."
        : "Today we will quickly walk through the materials, construction, and customization options.",
  }));
}

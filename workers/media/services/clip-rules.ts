import type { TranscriptSegment } from "../../packages/shared/media";
import type { ClipRules } from "../../packages/shared/task";

export interface ClipDecision {
  start: number;
  end: number;
  reason: string;
}

export function buildClipPlan(
  segments: TranscriptSegment[],
  rules: ClipRules,
): ClipDecision[] {
  console.log(
    `[clip-rules] Building clip plan with removeSilence=${rules.removeSilence} trimFillerWords=${rules.trimFillerWords}`,
  );

  return segments.map((segment) => ({
    start: segment.start,
    end: segment.end,
    reason: `Keep spoken segment within ${rules.minSegmentSeconds}-${rules.maxSegmentSeconds}s range`,
  }));
}

import { z } from "zod";

const clipModeSchema = z.enum(["subtitle-driven", "template", "hybrid"]);
const subtitleFormatSchema = z.enum(["srt", "vtt"]);

export const createTaskSchema = z.object({
  fileName: z.string().min(1),
  fileSize: z.number().positive(),
  durationSeconds: z.number().positive().optional(),
  clipMode: clipModeSchema,
  clipRules: z.object({
    removeSilence: z.boolean(),
    trimFillerWords: z.boolean(),
    maxSegmentSeconds: z.number().int().min(5).max(120),
    minSegmentSeconds: z.number().int().min(1).max(30),
  }),
  template: z.object({
    templateId: z.string().min(1),
    includeIntro: z.boolean(),
    includeOutro: z.boolean(),
    includeBackgroundMusic: z.boolean(),
  }),
  translation: z.object({
    sourceLanguage: z.string().min(2),
    targetLanguage: z.literal("en"),
    keepOriginalAudioBed: z.boolean(),
    subtitleFormat: subtitleFormatSchema,
  }),
  voice: z.object({
    provider: z.string().min(1),
    voiceId: z.string().min(1),
    speakingRate: z.number().min(0.7).max(1.3),
  }),
});

export type CreateTaskInput = z.infer<typeof createTaskSchema>;

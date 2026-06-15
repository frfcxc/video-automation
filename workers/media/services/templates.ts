import type { TemplateOptions } from "../../packages/shared/task";
import type { ClipDecision } from "./clip-rules";

export interface RenderTemplatePlan {
  templateId: string;
  includeIntro: boolean;
  includeOutro: boolean;
  includeBackgroundMusic: boolean;
  clipCount: number;
}

export function buildTemplatePlan(
  template: TemplateOptions,
  clipPlan: ClipDecision[],
): RenderTemplatePlan {
  console.log(`[templates] Preparing template ${template.templateId}`);

  return {
    templateId: template.templateId,
    includeIntro: template.includeIntro,
    includeOutro: template.includeOutro,
    includeBackgroundMusic: template.includeBackgroundMusic,
    clipCount: clipPlan.length,
  };
}

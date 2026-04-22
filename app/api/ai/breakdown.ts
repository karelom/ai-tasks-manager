import {
  createTaskPlanGroup,
  createTaskPlanVariant,
  fetchTaskPlanGroupFirstMatch,
  fetchTaskPlanVariantFirstMatch,
} from '@/lib/openAI/actions';
import { openAIbreakdown } from '@/lib/openAI/taskAI';
import { normalizeText } from '@/lib/utils';

export interface BreakDownTaskOptions {
  input: string;
  refinementContext: string;
  forceNew: boolean;
}

export default async function breakDownTask({
  input,
  refinementContext,
  forceNew,
}: BreakDownTaskOptions) {
  if (!input) {
    return { ok: false, error: 'Missing input' };
  }

  const normalizedInput = normalizeText(input);

  let groupResult = await fetchTaskPlanGroupFirstMatch({ normalizedInput });
  if (!groupResult.ok) return groupResult;
  if (!groupResult.data) {
    groupResult = await createTaskPlanGroup({ normalizedInput });
  }

  if (!forceNew) {
    const existingResult = await fetchTaskPlanVariantFirstMatch({
      groupId: groupResult.data!.id,
      ...(refinementContext ? { refinementContext } : { isBase: true }),
    });
    if (existingResult.ok && existingResult.data)
      return { ...existingResult, data: JSON.parse(existingResult.data.steps) };
  }

  console.log('🔥 AI CALLED');

  try {
    const aiResponse = await openAIbreakdown(input);
    const result = await createTaskPlanVariant({
      groupId: groupResult.data!.id,
      input,
      refinementContext: normalizeText(refinementContext) ?? null,
      steps: aiResponse ?? '',
      isBase: !refinementContext,
    });
    if (!result.ok) return result;
    return { ...result, data: JSON.parse(result.data?.steps ?? '') };
  } catch (err) {
    console.error(err);
    return { ok: false, error: 'AI Fail: fail to break down task.' };
  }
}

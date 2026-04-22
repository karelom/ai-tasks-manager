'use server';

import OpenAI from 'openai';

const client = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY!,
});

export async function openAIbreakdown(input: string) {
  const prompt = buildPrompt(input);

  const res = await client.chat.completions.create({
    model: 'gpt-4o-mini',
    messages: [{ role: 'system', content: prompt }],
    temperature: 0.2,
  });

  return res.choices[0].message.content;
}

function buildPrompt(input: string) {
  return `
You are a senior product manager.

Your task is to break down a user request into 5-8 actionable steps.

STRICT RULES:
- Output MUST be a valid JSON array
- DO NOT include any text outside JSON
- Each item MUST follow the schema exactly
- If a value is unknown, use null
- Keep steps concise and actionable
- Steps must be in logical order

Schema:
[
  {
    "title": string,
    "description": string | null,
    "status": "backlog" | "pending" | "in-progress" | "completed",
    "priority": "none" | "low" | "medium" | "high",
    "dueAt": Date | null  // ISO string format (YYYY-MM-DDTHH:mm:ss.sssZ) or null
  }
]

Rules:
- Default "status" = "backlog"
- Default "priority" = "none"
- "dueAt" should be null unless clearly implied

User input:
${input}
`;
}

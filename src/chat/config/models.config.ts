import { createOpenRouter } from '@openrouter/ai-sdk-provider'

import { env } from '@/env'

const openrouter = createOpenRouter({ apiKey: env.OPENROUTER_API_KEY })

export const aiModel = openrouter('qwen/qwen3-235b-a22b:free', {
  models: ['deepseek/deepseek-chat-v3-0324:free', 'qwen/qwen3-14b:free', 'google/gemini-2.0-flash-exp:free'],
})

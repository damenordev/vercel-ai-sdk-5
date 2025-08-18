import { createOpenRouter } from '@openrouter/ai-sdk-provider'

import { env } from '@/env'

const openrouter = createOpenRouter({ apiKey: env.OPENROUTER_API_KEY })

export const aiModel = openrouter('deepseek/deepseek-chat-v3-0324:free')

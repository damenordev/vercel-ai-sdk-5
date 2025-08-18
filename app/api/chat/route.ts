import { streamText, convertToModelMessages } from 'ai'

import { aiModel } from '@/chat/config'
import { getActiveTools } from '@/chat/tools'

import { PROMPT_LINUS } from './prompt-linus'

export async function POST(req: Request) {
  const { messages } = await req.json()
  const result = streamText({
    ...getActiveTools(),
    model: aiModel,
    messages: convertToModelMessages(messages),
    system: `${PROMPT_LINUS}. **NOTA**: Siempre responde en español.`,
  })

  return result.toUIMessageStreamResponse()
}

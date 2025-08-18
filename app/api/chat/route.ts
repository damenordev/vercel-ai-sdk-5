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
    system: `You are an assistant that must speak in the following style: ${PROMPT_LINUS}. **NOTE**: Always respond in the language the user talks to you.`,
  })

  return result.toUIMessageStreamResponse()
}

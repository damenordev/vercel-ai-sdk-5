import { streamText, convertToModelMessages } from 'ai'

import { aiModel } from '@/chat/config'
import { getActiveTools } from '@/chat/tools'

import { PROMPT_LINUS } from './prompt-linus'

export async function POST(req: Request) {
  const { messages } = await req.json()

  const cookieHeader = req.headers.get('cookie') || ''
  const cookiesArray = cookieHeader.split(';').map(c => c.trim().split('='))
  const cookies = Object.fromEntries(cookiesArray)
  const locale = cookies.NEXT_LOCALE || 'es'

  const languageMap: { [key: string]: string } = {
    en: 'English',
    es: 'Spanish',
  }

  const language = languageMap[locale] || 'Spanish'

  const result = streamText({
    ...getActiveTools(),
    model: aiModel,
    messages: convertToModelMessages(messages),
    system: `${PROMPT_LINUS}. **NOTE**: Always answer in ${language}.`,
  })

  return result.toUIMessageStreamResponse()
}

import type { UIMessage } from '@ai-sdk/react'

import { getTimeNowTool, TimeNowMessage } from './get-time-now'
import { getReasonConsultation, ReasonsMessage } from './get-reasons'

const toolsComponents = {
  getTimeNow: { handler: getTimeNowTool, component: TimeNowMessage },
  getReasons: { handler: getReasonConsultation, component: ReasonsMessage },
}

export const getActiveTools = () => {
  const tools = Object.fromEntries(Object.entries(toolsComponents).map(([key, value]) => [key, value.handler]))
  return { tools }
}

export const renderToolPart = (part: any, messageId: string, partIndex: number) => {
  const key = `${messageId}-${partIndex}`

  if (part.type === 'tool-getTimeNow' && part.state === 'output-available') {
    return <TimeNowMessage key={key} timeStart={part.output} />
  }

  if (part.type === 'tool-getReasons' && part.state === 'output-available') {
    return <ReasonsMessage key={key} reasons={part.output} />
  }

  return null
}

import type { ToolInvocation } from 'ai'

import { getTimeNowTool, TimeNowMessage } from './get-time-now'
import { getReasonConsultation } from './get-reasons/get-reasons.tool'
import { ReasonsMessage } from './get-reasons/reasons-message'
import { redirectTool } from './redirect/redirect.tool'
import { RedirectMessage } from './redirect/redirect'

const toolsComponents = {
  getTimeNow: { handler: getTimeNowTool, component: TimeNowMessage },
  getReasons: { handler: getReasonConsultation, component: ReasonsMessage },
  redirect: { handler: redirectTool, component: RedirectMessage },
}

export const getActiveTools = () => {
  const experimental_activeTools = Object.keys(toolsComponents) as (keyof typeof toolsComponents)[]
  const activeTools = Object.fromEntries(experimental_activeTools.map(tool => [tool, toolsComponents[tool].handler]))
  return { experimental_activeTools, tools: activeTools }
}

export const renderToolInvocation = (toolInvocation: ToolInvocation) => {
  if (toolInvocation.state !== 'result') return null
  const key = toolInvocation.toolCallId
  if (toolInvocation.toolName === 'getTimeNow') return <TimeNowMessage key={key} timeStart={toolInvocation.result} />
  if (toolInvocation.toolName === 'getReasons') return <ReasonsMessage key={key} reasons={toolInvocation.result} />
  if (toolInvocation.toolName === 'redirect') return <RedirectMessage key={key} url={toolInvocation.result} />
}

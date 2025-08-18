'use client'
import type { UIMessage } from 'ai'
import { Fragment, useEffect, useRef } from 'react'

import { ChatBubbleMessage } from './chat-bubble-message'
import { useChatContext } from '../provider'
import { renderToolInvocation } from '../tools'

const renderMessage = (message: UIMessage) => {
  if (message.parts && message.parts.length > 0) {
    return message.parts.map(part => {
      if (part.type === 'step-start') return
      if (part.type === 'text') return <ChatBubbleMessage key={message.id} message={message} />
      if (part.type === 'tool-invocation') return renderToolInvocation(part.toolInvocation)
      return null
    })
  }
}

export const ChatMessages = () => {
  const { messages, isLoading } = useChatContext()

  const endRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (endRef.current) {
      endRef.current.scrollIntoView({
        behavior: 'smooth',
        block: 'end',
        inline: 'nearest',
      })
    }
  }, [messages, isLoading])

  return (
    <div className="space-y-2 flex-1 overflow-y-auto px-4 pt-4">
      {messages.map(message => (
        <Fragment key={message.id}>{renderMessage(message)}</Fragment>
      ))}
      {isLoading && (
        <div className="flex flex-row gap-1 mx-5">
          <div className="size-2 rounded-full bg-muted-foreground animate-bounce [animation-delay:.7s]"></div>
          <div className="size-2 rounded-full bg-muted-foreground animate-bounce [animation-delay:.3s]"></div>
          <div className="size-2 rounded-full bg-muted-foreground animate-bounce [animation-delay:.7s]"></div>
        </div>
      )}
      <div ref={endRef} />
    </div>
  )
}

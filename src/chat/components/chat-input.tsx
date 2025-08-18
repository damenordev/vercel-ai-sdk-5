'use client'
import { useEffect, useRef } from 'react'
import { Loader2, SendHorizonal, Square } from 'lucide-react'

import { ButtonIcon, Textarea } from '@/ui'
import { cn } from '@/utils'

import { useChatContext } from '../provider'

export const ChatInput = () => {
  const { messages, isLoading, input, handleInputChange, handleSubmit, stop, status } = useChatContext()
  const textareaRef = useRef<HTMLTextAreaElement>(null)

  useEffect(() => {
    if (isLoading || messages.length === 0) return
    const lastMessage = messages[messages.length - 1]
    if (lastMessage?.role === 'assistant' && textareaRef.current) {
      setTimeout(() => textareaRef.current?.focus(), 100)
    }
  }, [isLoading, messages])

  return (
    <form className="flex flex-col rounded-xl p-2 bg-card mx-2" onSubmit={handleSubmit}>
      <Textarea
        ref={textareaRef}
        rows={6}
        value={input}
        onChange={handleInputChange}
        onKeyDown={e => {
          if (e.key === 'Enter' && !e.shiftKey) {
            e.preventDefault()
            handleSubmit(e as unknown as React.FormEvent<HTMLFormElement>)
          }
        }}
        placeholder="Escribe tu mensaje..."
        disabled={isLoading}
        className="custom-scrollbar w-full resize-none disabled:opacity-50 max-h-[260px]"
      />
      <div className="mt-2 flex items-center justify-between">
        <div className="flex items-center gap-2"></div>
        <div className="flex items-center gap-2">
          <ButtonIcon
            className={cn(status === 'streaming' ? 'hidden' : 'block')}
            type="submit"
            size="sm"
            disabled={isLoading}
          >
            {isLoading ? <Loader2 className="animate-spin" /> : <SendHorizonal />}
          </ButtonIcon>
          <ButtonIcon
            className={cn(status === 'streaming' ? 'block animate-pulse' : 'hidden')}
            size="sm"
            variant="destructive"
            type="button"
            onClick={stop}
          >
            <Square />
          </ButtonIcon>
        </div>
      </div>
    </form>
  )
}

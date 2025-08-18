'use client'
import type { UIMessage } from 'ai'
import { createContext, use } from 'react'
import { useChat } from '@ai-sdk/react'

export interface IChatContext {
  messages: UIMessage[]
  isLoading: boolean
  input: string
  handleInputChange: ReturnType<typeof useChat>['handleInputChange']
  handleSubmit: ReturnType<typeof useChat>['handleSubmit']
  stop: ReturnType<typeof useChat>['stop']
  status: ReturnType<typeof useChat>['status']
  append: ReturnType<typeof useChat>['append']
}

const ChatContext = createContext({} as IChatContext)

export const ChatProvider = ({ children }: { children: React.ReactNode }) => {
  const { messages, isLoading, input, handleInputChange, handleSubmit, stop, status, append } = useChat({
    onError: error => {
      console.error('Error al enviar el mensaje:', error)
    },
  })

  return (
    <ChatContext.Provider
      value={{
        messages,
        isLoading,
        input,
        handleInputChange,
        handleSubmit,
        stop,
        status,
        append,
      }}
    >
      {children}
    </ChatContext.Provider>
  )
}

export const useChatContext = () => {
  const context = use(ChatContext)
  if (!context) throw new Error('useChatContext must be used within a ChatProvider')
  return context
}

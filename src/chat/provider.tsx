'use client'
import type { UIMessage } from '@ai-sdk/react'
import { createContext, use, useState } from 'react'
import { useChat } from '@ai-sdk/react'

export interface IChatContext {
  messages: UIMessage[]
  input: string
  setInput: (input: string) => void
  sendMessage: ReturnType<typeof useChat>['sendMessage']
  stop: ReturnType<typeof useChat>['stop']
  status: ReturnType<typeof useChat>['status']
  handleInputChange: (e: React.ChangeEvent<HTMLTextAreaElement>) => void
  handleSubmit: (e: React.FormEvent) => void
}

const ChatContext = createContext({} as IChatContext)

export const ChatProvider = ({ children }: { children: React.ReactNode }) => {
  const [input, setInput] = useState('')
  
  const { messages, sendMessage, stop, status } = useChat({
    onError: error => {
      console.error('Error al enviar el mensaje:', error)
    },
  })

  const handleInputChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setInput(e.target.value)
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (input.trim()) {
      sendMessage({ text: input })
      setInput('')
    }
  }

  return (
    <ChatContext.Provider
      value={{
        messages,
        input,
        setInput,
        sendMessage,
        stop,
        status,
        handleInputChange,
        handleSubmit,
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

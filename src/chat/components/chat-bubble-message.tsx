import type { UIMessage } from 'ai'
import ReactMarkdown from 'react-markdown'

import { cn } from '@/utils'

export interface IChatBubbleMessageProps {
  message: UIMessage
}

export const ChatBubbleMessage: React.FC<IChatBubbleMessageProps> = ({ message }) => {
  return (
    <div
      key={message.id}
      className={cn('flex', { 'justify-end': message.role === 'user', 'justify-start': message.role !== 'user' })}
    >
      <div
        className={cn('max-w-[80%] text-sm', {
          'bg-primary text-primary-foreground px-1.5 py-0.5 rounded-lg': message.role === 'user',
        })}
      >
        <ReactMarkdown>{message.content}</ReactMarkdown>
      </div>
    </div>
  )
}

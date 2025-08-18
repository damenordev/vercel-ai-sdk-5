'use client'
import { useState } from 'react'
import { Check } from 'lucide-react'

import { Button } from '@/ui'

import { useChatContext } from '../../provider'

export interface IReasonsMessageProps {
  reasons: {
    id: number
    description: string
    area_id: number
  }[]
}

export const ReasonsMessage: React.FC<IReasonsMessageProps> = ({ reasons }) => {
  const [selectedReasonId, setSelectedReasonId] = useState<number | null>(null)
  const { sendMessage } = useChatContext()

  const handleReasonClick = (reason: IReasonsMessageProps['reasons'][number]) => {
    if (selectedReasonId === null) {
      setSelectedReasonId(reason.id)
      sendMessage({
        text: `He seleccionado: ${reason.description}`,
      })
    }
  }

  return (
    <div className="my-2">
      <p className="text-sm font-medium text-foreground mb-3">Por favor, selecciona un motivo para tu consulta:</p>
      <div className="flex flex-wrap gap-2">
        {reasons.map(reason => {
          const isSelected = selectedReasonId === reason.id
          const isDisabled = selectedReasonId !== null

          return (
            <Button
              key={reason.id}
              variant={isSelected ? 'default' : 'outline'}
              size="sm"
              onClick={() => handleReasonClick(reason)}
              disabled={isDisabled}
            >
              {isSelected && <Check className="size-4" />}
              {reason.description}
            </Button>
          )
        })}
      </div>
    </div>
  )
}

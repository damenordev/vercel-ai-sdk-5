'use client'

import { useEffect, useRef } from 'react'
import { useLocale } from '@/i18n'

// Calcular valores estáticos una sola vez
const TIMEZONE = Intl.DateTimeFormat().resolvedOptions().timeZone
const getUtcOffset = () => {
  const offsetMinutes = -new Date().getTimezoneOffset()
  const sign = offsetMinutes >= 0 ? '+' : '-'
  const absOffset = Math.abs(offsetMinutes)
  const hours = String(Math.floor(absOffset / 60)).padStart(2, '0')
  const mins = String(absOffset % 60).padStart(2, '0')
  return `UTC${sign}${hours}:${mins}`
}
const UTC_OFFSET = getUtcOffset()

export const TimeNowMessage = ({ timeStart }: { timeStart: string }) => {
  const locale = useLocale()
  const dateRef = useRef<HTMLSpanElement>(null)
  const timeRef = useRef<HTMLSpanElement>(null)
  const isoRef = useRef<HTMLSpanElement>(null)

  useEffect(() => {
    const updateTime = () => {
      const now = new Date()

      if (dateRef.current) {
        dateRef.current.textContent = now.toLocaleDateString(locale, {
          weekday: 'long',
          year: 'numeric',
          month: 'long',
          day: 'numeric',
        })
      }

      if (timeRef.current) {
        timeRef.current.textContent = now.toLocaleTimeString(locale, {
          hour: '2-digit',
          minute: '2-digit',
          second: '2-digit',
        })
      }

      if (isoRef.current) {
        isoRef.current.textContent = now.toISOString()
      }
    }

    // Actualización inicial
    updateTime()

    const timer = window.setInterval(updateTime, 1000)
    return () => window.clearInterval(timer)
  }, [locale])

  return (
    <div className="p-3 rounded-md border max-w-lg">
      <div className="flex justify-between">
        <div>
          <p className="text-sm text-muted-foreground">Fecha</p>
          <span ref={dateRef} className="font-medium block" />
        </div>
        <div className="text-right">
          <p className="text-sm text-muted-foreground">Hora</p>
          <span ref={timeRef} className="font-medium text-lg block" />
        </div>
      </div>
      <div className="grid grid-cols-2 gap-1 text-sm text-muted-foreground mt-2">
        <div>
          <p className="text-xs">Zona horaria</p>
          <p className="font-medium text-foreground">{TIMEZONE}</p>
        </div>
        <div className="text-right">
          <p className="text-xs">Offset</p>
          <p className="font-medium text-foreground">{UTC_OFFSET}</p>
        </div>
        <div className="col-span-2">
          <p className="text-xs">ISO</p>
          <span ref={isoRef} className="font-mono text-xs block" />
        </div>
      </div>
    </div>
  )
}

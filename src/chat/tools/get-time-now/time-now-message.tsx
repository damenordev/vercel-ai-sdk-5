'use client'
import { useEffect, useState } from 'react'

import { useLocale } from '@/i18n'

export const TimeNowMessage = ({ timeStart }: { timeStart: string }) => {
  const locale = useLocale()
  const [time, setTime] = useState<Date>(() => new Date(timeStart))

  useEffect(() => {
    const interval = setInterval(() => setTime(new Date()), 1000)
    return () => clearInterval(interval)
  }, [])

  const dateReadable = time.toLocaleDateString(locale, {
    weekday: 'long',
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  })

  const timeReadable = time.toLocaleTimeString(locale, {
    hour: '2-digit',
    minute: '2-digit',
    second: '2-digit',
  })

  const timeZone = Intl.DateTimeFormat().resolvedOptions().timeZone
  const offsetMinutes = -time.getTimezoneOffset()
  const sign = offsetMinutes >= 0 ? '+' : '-'
  const absOffset = Math.abs(offsetMinutes)
  const offsetHours = String(Math.floor(absOffset / 60)).padStart(2, '0')
  const offsetMins = String(absOffset % 60).padStart(2, '0')
  const utcOffset = `UTC${sign}${offsetHours}:${offsetMins}`

  return (
    <div className="p-3 rounded-md border max-w-lg">
      <div className="flex items-center justify-between">
        <div>
          <p className="text-sm text-muted-foreground">Fecha</p>
          <p className="font-medium">{dateReadable}</p>
        </div>
        <div className="text-right">
          <p className="text-sm text-muted-foreground">Hora</p>
          <p className="font-medium text-lg">{timeReadable}</p>
        </div>
      </div>

      <div className="grid grid-cols-2 gap-1 text-sm text-muted-foreground">
        <div className="break-words">
          <p className="text-xs">Zona horaria</p>
          <p className="font-medium text-foreground">{timeZone}</p>
        </div>
        <div className="text-right">
          <p className="text-xs">Offset</p>
          <p className="font-medium text-foreground">{utcOffset}</p>
        </div>
        <div className="col-span-2">
          <p className="text-xs">ISO</p>
          <p className="font-mono text-xs">{time.toISOString()}</p>
        </div>
      </div>
    </div>
  )
}

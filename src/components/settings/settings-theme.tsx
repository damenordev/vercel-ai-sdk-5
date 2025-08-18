'use client'
import { Sun, Moon, Computer } from 'lucide-react'
import { useTheme } from 'next-themes'

import { useTranslations } from '@/i18n'

import { Label, RadioGroup, RadioGroupItem } from '@/ui'

export const SettingsTheme = () => {
  const { theme, setTheme } = useTheme()
  const t = useTranslations('settingsDialog')
  const themeOptions = [
    { value: 'light', label: t('theme.light'), icon: <Sun className="size-4" /> },
    { value: 'dark', label: t('theme.dark'), icon: <Moon className="size-4" /> },
    { value: 'system', label: t('theme.system'), icon: <Computer className="size-4" /> },
  ]
  return (
    <section className="space-y-3">
      <h3 className="text-sm font-medium text-foreground">{t('theme.title')}</h3>
      <RadioGroup value={theme} onValueChange={setTheme} className="grid grid-cols-3 gap-3">
        {themeOptions.map(item => (
          <Label
            key={item.value}
            htmlFor={`theme-${item.value}`}
            className={`flex flex-col items-center justify-center gap-2 rounded-lg border p-3 cursor-pointer active:scale-[0.99] transition-transform ${
              theme === item.value
                ? 'bg-primary text-primary-foreground ring-2 ring-primary'
                : 'bg-background hover:bg-accent hover:text-accent-foreground transition-colors'
            }`}
          >
            <RadioGroupItem value={item.value} id={`theme-${item.value}`} className="sr-only" />
            {item.icon}
            <span className="text-xs capitalize">{item.label}</span>
          </Label>
        ))}
      </RadioGroup>
    </section>
  )
}

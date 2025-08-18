'use client'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/ui'

import { useRouter, usePathname, useLocale, I18N_LOCALES, I18N_LOCALES_NAMES, type Ti18nLocale } from '@/i18n'

export const SettingsLanguage = () => {
  const currentLocale = useLocale()
  const router = useRouter()
  const pathname = usePathname()

  const handleLanguageChange = (newLocale: string) => {
    router.push(pathname, { locale: newLocale })
  }

  return (
    <Select value={currentLocale} onValueChange={handleLanguageChange}>
      <SelectTrigger className="w-full" size="sm">
        <SelectValue placeholder={I18N_LOCALES_NAMES[currentLocale as Ti18nLocale]} />
      </SelectTrigger>
      <SelectContent>
        {I18N_LOCALES.map(lang => (
          <SelectItem className="cursor-pointer" key={lang} value={lang}>
            <span>{I18N_LOCALES_NAMES[lang]}</span>
          </SelectItem>
        ))}
      </SelectContent>
    </Select>
  )
}

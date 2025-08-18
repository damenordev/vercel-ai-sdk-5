'use client'
import { Settings, Languages, Palette } from 'lucide-react'

import { useTranslations } from '@/i18n'
import { SettingsLanguage } from '@/components/settings'
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription, DialogTrigger, ButtonIcon } from '@/ui'

import { SettingsTheme } from './settings-theme'

export const SettingsDialog = () => {
  const t = useTranslations('core.settingsDialog')
  return (
    <Dialog>
      <DialogTrigger asChild>
        <ButtonIcon variant="outline" size="sm">
          <Settings />
        </ButtonIcon>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[480px] p-4">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2">
            <Palette className="size-4" />
            <span>{t('title')}</span>
          </DialogTitle>
          <DialogDescription className="text-xs -mt-0.5 text-left">{t('description')}</DialogDescription>
        </DialogHeader>

        <div className="space-y-3 flex-1 overflow-y-auto px-4">
          <SettingsTheme />

          {/* Language Selection */}
          <section className="space-y-3">
            <h3 className="text-sm font-medium text-foreground">{t('language.title')}</h3>
            <div className="flex items-center space-x-2">
              <Languages className="size-5 text-muted-foreground" />
              <SettingsLanguage />
            </div>
          </section>
        </div>
      </DialogContent>
    </Dialog>
  )
}

import { NextIntlClientProvider } from 'next-intl'
import { notFound } from 'next/navigation'

import { I18N_LOCALES } from './constants/locales.constants'
import { getMessages } from './utils'
import { type Ti18nLocale } from './types'

export interface I18nProviderProps {
  children: React.ReactNode
  locale: string
}

export const I18nProvider: React.FC<I18nProviderProps> = async ({ children, locale }) => {
  if (!(I18N_LOCALES as ReadonlyArray<string>).includes(locale)) notFound()

  let messages
  try {
    messages = await getMessages(locale as Ti18nLocale)
  } catch (error) {
    console.error(`Could not load messages for locale ${locale}:`, error)
    notFound()
  }
  return (
    <NextIntlClientProvider locale={locale} messages={messages}>
      {children}
    </NextIntlClientProvider>
  )
}

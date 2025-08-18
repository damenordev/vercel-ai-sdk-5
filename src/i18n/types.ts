import type { I18N_LOCALES } from './constants/locales.constants'

export type Ti18nLocale = (typeof I18N_LOCALES)[number]

export type Ti18nMessages = Record<string, unknown>

export type Ti18nModuleName = string

export type Ti18nMessageLoader = (locale: Ti18nLocale) => Promise<Ti18nMessages | null>

export interface Ti18nLoadMessagesResult {
  messages: Ti18nMessages
  loadedModules: Ti18nModuleName[]
  failedModules: Ti18nModuleName[]
}

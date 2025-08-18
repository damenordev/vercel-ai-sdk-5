import type { Ti18nLocale, Ti18nMessages } from '@/i18n/types'

import { loadMessages } from './load-messages.util'

/**
 * Devuelve únicamente el objeto de mensajes combinado para un `locale` dado.
 * Azúcar de conveniencia sobre `loadMessages`.
 *
 * @param locale - Código de idioma solicitado (p. ej. 'es' | 'en').
 * @returns Objeto de mensajes combinado y namespaced por módulo.
 */
export const getMessages = async (locale: Ti18nLocale): Promise<Ti18nMessages> => {
  const result = await loadMessages(locale)
  return result.messages
}

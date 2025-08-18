import { i18nConfig } from '@/i18n/config/loader-config'
import type { Ti18nLocale, Ti18nMessages, Ti18nModuleName, Ti18nMessageLoader } from '@/i18n/types'

/**
 * Crea un cargador de mensajes para un módulo específico.
 * Esta utilidad carga dinámicamente los ficheros de mensajes de un módulo y
 * devuelve un objeto namespaced bajo el nombre del propio módulo, p. ej.:
 * `{ auth: { signIn: { title: '...' } } }`.
 *
 * - Carga `src/[moduleName]/messages/[locale].json` mediante import dinámico
 * - Aplica namespacing automático: `{ [moduleName]: rawMessages }`
 * - Respeta la configuración `failSilently` y `enableLogging` de `i18nConfig`
 *
 * @param moduleName - Nombre del módulo i18n (p. ej. 'core', 'auth', 'home')
 * @returns Función asíncrona que, dado un `locale`, devuelve mensajes o `null` en modo silencioso
 */
export const createModuleLoader = (moduleName: Ti18nModuleName): Ti18nMessageLoader => {
  return async (locale: Ti18nLocale): Promise<Ti18nMessages | null> => {
    try {
      const rawMessages: Ti18nMessages = (await import(`../../${moduleName}/messages/${locale}.json`)).default

      const builtMessages: Ti18nMessages = { [moduleName]: rawMessages }

      if (i18nConfig.enableLogging) console.log(`✅ Loaded messages for module: ${moduleName} (${locale})`)

      return builtMessages
    } catch (error) {
      if (i18nConfig.enableLogging) {
        console.warn(`⚠️ Failed to load messages for module: ${moduleName} (${locale})`, error)
      }
      if (!i18nConfig.failSilently) throw new Error(`Failed to load messages for module: ${moduleName}`)
      return null
    }
  }
}

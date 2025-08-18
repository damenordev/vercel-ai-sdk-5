import type { Ti18nLocale, Ti18nMessages, Ti18nModuleName, Ti18nLoadMessagesResult } from '@/i18n/types'
import { i18nConfig } from '@/i18n/config/loader-config'

import { createModuleLoader } from './create-module-loader.util'

/**
 * Verifica si un valor es un objeto combinable (no nulo, no array).
 * Útil para decidir si se deben fusionar propiedades en lugar de sobrescribir.
 */
const isMergableObject = (value: unknown): value is Record<string, unknown> => {
  return typeof value === 'object' && value !== null && !Array.isArray(value)
}

/**
 * Fusiona `source` dentro de `target` con una combinación superficial por clave.
 * Si ambos valores de una clave son objetos combinables, los mezcla; en caso contrario, sobrescribe.
 */
const mergeInto = (target: Ti18nMessages, source: Ti18nMessages): void => {
  Object.keys(source).forEach(key => {
    const sourceValue = source[key]
    const targetValue = target[key]

    if (isMergableObject(sourceValue) && isMergableObject(targetValue)) {
      target[key] = { ...(targetValue as object), ...sourceValue }
      return
    }

    target[key] = sourceValue
  })
}

/**
 * Construye la lista de loaders por módulo a partir de `i18nConfig.modules`.
 * Devuelve pares `{ moduleName, loader }` para su ejecución en paralelo.
 */
const buildModuleLoaders = () => {
  const allModules = [...i18nConfig.modules]
  if (i18nConfig.common) allModules.push(i18nConfig.common)
  return allModules.map(moduleName => ({ moduleName, loader: createModuleLoader(moduleName) }))
}

/**
 * Imprime un resumen de carga i18n si `enableLogging` está activo.
 * Muestra módulos cargados y fallidos para el `locale` dado.
 */
const printSummary = (locale: Ti18nLocale, loadedModules: Ti18nModuleName[], failedModules: Ti18nModuleName[]) => {
  if (!i18nConfig.enableLogging) return
  console.log(`🌐 i18n Summary (${locale}):`)
  console.log(`   ✅ Loaded: ${loadedModules.join(', ')}`)
  if (failedModules.length > 0) console.log(`   ❌ Failed: ${failedModules.join(', ')}`)
}

/**
 * Utilidad para cargar y combinar mensajes i18n de todos los módulos configurados
 * Carga en paralelo los mensajes definidos por `i18nConfig.modules` y devuelve:
 * - `messages`: objeto combinado, ya namespaced por módulo (incluido `core`)
 * - `loadedModules`: módulos cargados con éxito
 * - `failedModules`: módulos que fallaron al cargar (si `failSilently`)
 * - Itera `i18nConfig.modules` y usa `createModuleLoader` por módulo
 * - Combina los mensajes namespaced en `messages`
 * - Respeta `failSilently` y `enableLogging`
 *
 * @param locale - Locale solicitado (p. ej. 'es' | 'en').
 * @returns Objeto con `messages`, `loadedModules` y `failedModules`.
 */
export const loadMessages = async (locale: Ti18nLocale): Promise<Ti18nLoadMessagesResult> => {
  const loaders = buildModuleLoaders()

  const settled = await Promise.allSettled(
    loaders.map(async ({ moduleName, loader }) => ({ moduleName, messages: await loader(locale) }))
  )

  const combinedMessages: Ti18nMessages = {}
  const loadedModules: Ti18nModuleName[] = []
  const failedModules: Ti18nModuleName[] = []

  settled.forEach((result, index) => {
    const moduleName = loaders[index]?.moduleName
    if (!moduleName) return

    const isFulfilled = result.status === 'fulfilled'
    const moduleMessages = isFulfilled ? result.value.messages : null

    if (!moduleMessages) return failedModules.push(moduleName)

    mergeInto(combinedMessages, moduleMessages)
    loadedModules.push(moduleName)
  })

  printSummary(locale, loadedModules, failedModules)

  return { messages: combinedMessages, loadedModules, failedModules }
}

import type { Ti18nModuleName } from '@/i18n/types'

/**
 * Configuración del sistema i18n.
 *
 * @property failSilently - Si es true, la carga continúa aunque falten módulos o ficheros de idioma.
 *                          Útil en desarrollo para no romper la navegación por un idioma/módulo incompleto.
 * @property enableLogging - Si es true, muestra logs de carga de mensajes (recomendado solo fuera de producción).
 * @property modules - Lista de módulos con mensajes. Se recomienda incluir siempre 'core' si existe
 *                     `src/core/messages/[locale].json`. Todos los módulos (incluido 'core') se cargan con
 *                     namespace automático, por lo que las claves deben referenciarse como `modulo.algo`.
 */
export interface II18nConfig {
  failSilently: boolean
  enableLogging: boolean
  modules: Ti18nModuleName[]
}

/**
 * Lista de módulos que contienen mensajes de internacionalización
 *
 * Para agregar un nuevo módulo:
 * 1. Añade el nombre del módulo a esta lista
 * 2. Crea la carpeta: `src/[module]/messages/`
 * 3. Crea los archivos de idioma: `[locale].json`
 *
 * Convenciones de ruta:
 * - Mensajes del módulo `core`: `src/core/messages/[locale].json`
 * - Mensajes de cualquier módulo: `src/[module]/messages/[locale].json`
 *
 * Notas de namespacing:
 * - Todos los módulos (incluido `core`) se cargan con namespace automático.
 * - Ejemplos de uso con `useTranslations`:
 *   - `useTranslations('core.settingsDialog')`
 *   - `useTranslations('auth.signIn')`
 */

export const i18nConfig: II18nConfig = {
  failSilently: true,
  // enableLogging: process.env.NODE_ENV !== 'production',
  enableLogging: false,
  modules: ['i18n'],
} as const

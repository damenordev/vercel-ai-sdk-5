# Guía de uso i18n

Esta guía explica cómo usar el módulo i18n del proyecto (basado en `next-intl`) y sus utilidades internas.

## Configuración

- Archivo: `src/i18n/config/loader-config.ts`
- Propiedades:
  - `failSilently`: continúa la carga aunque falten módulos o ficheros de idioma.
  - `enableLogging`: activa logs de carga (recomendado en desarrollo).
  - `modules`: lista de módulos con mensajes. Ej.: `['core', 'auth', 'home']`.

## Estructura de carpetas

Coloca los mensajes por módulo en:

- `src/[module]/messages/[locale].json`

Ejemplos:

- `src/core/messages/es.json`
- `src/auth/messages/en.json`
- `src/home/messages/es.json`

Todos los módulos, incluido `core`, se cargan con namespace automático.

## Carga de mensajes

- Utilidad principal: `src/i18n/utils/load-messages.util.ts`
- Azúcar de conveniencia: `src/i18n/utils/get-messages.util.ts`

El provider `src/i18n/provider.tsx` usa `getMessages(locale)` y entrega `messages` a `NextIntlClientProvider`.

## Uso en servidor

- Configuración de request: `src/i18n/config/get-request-config.ts`
- Middleware de localización: `src/i18n/middleware.ts`
- Utilidades server: `src/i18n/server.ts` (re-export de `next-intl/server`)

```ts
// middleware.ts
import { type NextRequest } from 'next/server'
import { i18nMiddleware } from '@/i18n/middleware'

export function middleware(request: NextRequest) {
  // Otros middleware
  return i18nMiddleware(request)
}
```

```tsx
// Ejemplo en un Server Component usando getTranslations
import { getTranslations } from '@/i18n/server'

export const SettingsTitle = async () => {
  const t = await getTranslations('core.settingsDialog')
  return <h1>{t('title')}</h1>
}
```

## Uso en cliente

- Hooks de navegación y localización: `src/i18n/navigation.ts`
  - `useRouter`, `usePathname`, `Link`, `useLocale`, etc.
- Hook de traducciones (re-export): `src/i18n/index.ts`
  - `useTranslations('modulo.namespace')`

```tsx
// Ejemplo en un componente de core
import { useTranslations } from '@/i18n'

export const MyComponent = () => {
  const t = useTranslations('core.settingsDialog')
  return <h2>{t('title')}</h2>
}
```

### Ejemplos de namespaces

- Core: `useTranslations('core.settingsDialog')`
- Auth: `useTranslations('auth.signIn')`
- Home: `useTranslations('home.header')`

```tsx
// Ejemplo en un componente de auth (cliente)
import { useTranslations } from '@/i18n'

export const SignInButton = () => {
  const t = useTranslations('auth.signIn')
  return <button>{t('submit')}</button>
}
```

```tsx
// Ejemplo en un Server Component obteniendo el locale y renderizando con provider
import { getLocale } from '@/i18n/server'
import { AppProvider } from '@/core/provider'

export default async function RootLayout({ children }: { children: React.ReactNode }) {
  const locale = await getLocale()
  return (
    <html lang={locale}>
      <body>
        <AppProvider locale={locale}>{children}</AppProvider>
      </body>
    </html>
  )
}
```

## Añadir un nuevo módulo

1. Crear archivos de mensajes:
   - `src/nuevo-modulo/messages/es.json`
   - `src/nuevo-modulo/messages/en.json` (u otros locales)
2. Agregar el nombre del módulo a `modules` en `loader-config.ts`.
3. Usar `useTranslations('nuevo-modulo.algo')` en el código.

```ts
// next.config.ts
import type { NextConfig } from 'next'
import createNextIntlPlugin from 'next-intl/plugin'

const withNextIntl = createNextIntlPlugin('./src/i18n/config/get-request-config.ts')
const nextConfig: NextConfig = {}
export default withNextIntl(nextConfig)
```

## Añadir/soportar locales

- Definir locales en `src/i18n/constants/locales.constants.ts` (`I18N_LOCALES`, `I18N_DEFAULT_LOCALE`).
- Asegurarse de crear los ficheros `[locale].json` por módulo para evitar huecos.

## Buenas prácticas

- Mantén claves consistentes y descriptivas.
- Evita colisiones: cada módulo es su propio namespace.
- Activa `enableLogging` en desarrollo para ver el resumen de carga.
- Usa `getMessages` en server y `useTranslations` en client.

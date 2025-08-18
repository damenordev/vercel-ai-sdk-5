# i18n – Arquitectura y dependencias

Esta documentación describe la arquitectura del módulo `i18n`, sus dependencias internas/externas, el flujo de carga de mensajes, su integración en Next.js y pautas de uso y mantenimiento.

## Propósito

- Proveer internacionalización basada en `next-intl` con carga modular por dominio de la app.
- Aislar configuración, navegación localizada, provider y middleware en `src/i18n/`.

## Alcance

- Configuración de locales y routing.
- Carga dinámica y combinación de mensajes por módulo.
- Provider de traducciones y utilidades de navegación.
- Middleware y configuración por-request.

## Mapa de dependencias

### Dependencias externas

- `next-intl`, `next-intl/server`, `next-intl/navigation`, `next-intl/middleware`
- `next/navigation` (`notFound`)
- `process.env.NODE_ENV` (control de logs)

### Dependencias internas (del repo)

- `src/i18n/constants/locales.constants.ts` – Locales soportados y por defecto.
- `src/i18n/config/routing.ts` – Routing localizado (`defineRouting`).
- `src/i18n/config/get-request-config.ts` – Carga `locale` y `messages` por request.
- `src/i18n/config/loader-config.ts` – Lista de módulos y flags de carga.
- `src/i18n/utils/create-module-loader.util.ts` – Import dinámico de mensajes por módulo/locale.
- `src/i18n/utils/load-messages.util.ts` – Orquestación y combinación de mensajes.
- `src/i18n/utils/get-messages.util.ts` – Azúcar sobre `loadMessages`.
- `src/i18n/provider.tsx` – Inyección de `messages` en `NextIntlClientProvider`.
- `src/i18n/navigation.ts` – `Link`, `useRouter`, `usePathname`, `useLocale` localizados.
- `src/i18n/middleware.ts` – Middleware basado en `routing`.
- `src/i18n/index.ts`, `src/i18n/server.ts` – Re-exports convenientes.

### Dependencias transitivas (módulos de mensajes)

Controladas por `i18nConfig.modules` en `loader-config.ts`. Actualmente:

- `src/core/messages/[locale].json`
- `src/auth/messages/[locale].json`
- `src/home/messages/[locale].json`

## Flujo de carga de mensajes (alto nivel)

1. `i18nConfig.modules` declara los módulos con mensajes.
2. `loadMessages(locale)` construye loaders por módulo y los ejecuta en paralelo (`Promise.allSettled`).
3. Cada loader hace import dinámico de `src/[module]/messages/[locale].json` y devuelve `{ [module]: rawMessages }`.
4. Se combinan los objetos namespaced en `messages`.
5. Se imprime un resumen si `enableLogging` está activo.
6. `getMessages(locale)` devuelve únicamente `messages` (azúcar).

## Integración con Next.js

- `next.config.ts`: usa el plugin de `next-intl` apuntando a `get-request-config.ts`.

```ts
// next.config.ts
import type { NextConfig } from 'next'
import createNextIntlPlugin from 'next-intl/plugin'

const withNextIntl = createNextIntlPlugin('./src/i18n/config/get-request-config.ts')
const nextConfig: NextConfig = {}
export default withNextIntl(nextConfig)
```

- Middleware (edge):

```ts
// middleware.ts
import { type NextRequest } from 'next/server'
import { i18nMiddleware } from '@/i18n/middleware'

export function middleware(request: NextRequest) {
  return i18nMiddleware(request)
}
```

- Provider en layout server:

```tsx
// app/[locale]/layout.tsx (ejemplo)
import { I18nProvider } from '@/i18n/provider'

export default function RootLayout({ children, params }: { children: React.ReactNode; params: { locale: string } }) {
  return (
    <html lang={params.locale}>
      <body>
        {/* I18nProvider obtiene los mensajes internamente */}
        {/* Alternativamente puedes pasar locale si tu layout lo resuelve */}
        <I18nProvider locale={params.locale}>{children}</I18nProvider>
      </body>
    </html>
  )
}
```

## APIs públicas

- Hooks/UI (desde `src/i18n/index.ts` y `navigation.ts`):
  - `useTranslations`, `useLocale`, `useFormatter`, `useMessages`, `useNow`, `useTimeZone`
  - `Link`, `useRouter`, `usePathname`, `redirect`, `permanentRedirect`, `getPathname`
- Server (`src/i18n/server.ts`): re-exports de `next-intl/server` (`getTranslations`, `getLocale`, etc.)
- Provider: `I18nProvider`

## Ejemplos

### Server Component con traducciones

```tsx
import { getTranslations } from '@/i18n/server'

export const SettingsTitle = async () => {
  const t = await getTranslations('core.settingsDialog')
  return <h1>{t('title')}</h1>
}
```

### Cliente con `useTranslations`

```tsx
import { useTranslations } from '@/i18n'

export const MyComponent = () => {
  const t = useTranslations('core.settingsDialog')
  return <h2>{t('title')}</h2>
}
```

### Navegación localizada

```tsx
import { Link, useRouter, usePathname, useLocale } from '@/i18n/navigation'

export const Nav = () => {
  const router = useRouter()
  const pathname = usePathname()
  const locale = useLocale()

  return (
    <nav>
      <Link href="/">Home</Link>
      <button onClick={() => router.push(`${pathname}?from=${locale}`)}>Ir</button>
    </nav>
  )
}
```

## Configuración y convenciones

- Rutas de mensajes por módulo: `src/[module]/messages/[locale].json`
- Namespace automático: las claves se acceden como `modulo.seccion.clave`.
- Locales soportados: `src/i18n/constants/locales.constants.ts`.
- Configuración de carga: `src/i18n/config/loader-config.ts`:
  - `modules`: módulos a cargar (p. ej. `['core', 'auth', 'home']`).
  - `failSilently`: si `true`, no rompe cuando falta un fichero; devuelve `null` para ese módulo.
  - `enableLogging`: muestra resumen de módulos cargados/fallidos.

## Añadir un nuevo módulo de i18n

1. Crear mensajes:
   - `src/nuevo-modulo/messages/es.json`
   - `src/nuevo-modulo/messages/en.json` (u otros locales)
2. Agregar `'nuevo-modulo'` a `modules` en `loader-config.ts`.
3. Usar `useTranslations('nuevo-modulo.namespace')` en el código.

## Añadir/soportar locales

- Editar `I18N_LOCALES` e `I18N_DEFAULT_LOCALE` en `locales.constants.ts`.
- Añadir los ficheros `[locale].json` en cada módulo listado en `i18nConfig.modules`.

## Buenas prácticas

- Mantén claves consistentes y descriptivas; evita duplicados entre módulos.
- Paridad de claves entre locales (usa scripts/checks si es posible).
- Activa `enableLogging` en desarrollo; desactívalo en producción.
- Carga solo los módulos necesarios en `i18nConfig.modules`.

## Troubleshooting

- Mensajes faltantes en un módulo/locale:
  - Verifica existencia de `src/[module]/messages/[locale].json`.
  - Con `enableLogging=true`, revisa el resumen: módulos en ❌ `Failed`.
  - Si `failSilently=false`, el error se elevará; corrige o restaura el fichero.
- `notFound()` en `I18nProvider`:
  - Comprueba que `locale` esté en `I18N_LOCALES`.
- Imports dinámicos y bundling:
  - La ruta dinámica en `create-module-loader.util.ts` debe coincidir: `../../${module}/messages/${locale}.json`.

## Rendimiento

- Carga en paralelo de todos los módulos (`Promise.allSettled`).
- Namespacing ligero y combinación superficial por clave.
- Logging desactivado en producción para evitar overhead.

## Testing (sugerencias)

- Tests de integridad por módulo: comprobar que los JSON de cada `locale` existen y poseen claves mínimas.
- Tests de paridad de claves entre locales para un mismo módulo.
- Tests de `loadMessages(locale)`: asegurar que combina `messages` y reporta `loadedModules/failedModules` como se espera.

## Checklist de cambios relacionados con i18n

- [ ] Añadir/eliminar módulo en `i18nConfig.modules`.
- [ ] Crear/actualizar `src/[module]/messages/[locale].json` para todos los locales soportados.
- [ ] Validar navegación y middleware en entornos multidioma.
- [ ] Revisar logs en desarrollo (`enableLogging`).

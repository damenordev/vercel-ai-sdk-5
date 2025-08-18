import { defineRouting } from 'next-intl/routing'

import { I18N_DEFAULT_LOCALE, I18N_LOCALES } from '../constants/locales.constants'

export const routing = defineRouting({
  locales: I18N_LOCALES,
  defaultLocale: I18N_DEFAULT_LOCALE,
  localePrefix: 'never',
})

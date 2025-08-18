import createMiddlewareNextIntl from 'next-intl/middleware'
import { routing } from './config/routing'

export const i18nMiddleware = createMiddlewareNextIntl(routing)

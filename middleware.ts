import { type NextRequest } from 'next/server'
import { i18nMiddleware } from '@/i18n/middleware'

export function middleware(request: NextRequest) {
  return i18nMiddleware(request)
}

export const config = {
  matcher: ['/((?!api|_next|_vercel|.*\\..*).*)'],
}

import { type NextRequest } from 'next/server'

import { i18nMiddleware } from './src/i18n/middleware'

export async function middleware(request: NextRequest) {
  // Skip middleware for API routes
  if (request.nextUrl.pathname.startsWith('/api/')) return
  return i18nMiddleware(request)
}

export const config = {
  matcher: ['/((?!_next/static|_next/image|favicon.ico|images|sw).*)'],
}

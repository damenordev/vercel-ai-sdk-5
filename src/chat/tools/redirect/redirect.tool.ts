import { z } from 'zod'
import { tool } from 'ai'
import { NAV_URLS } from '@/core/constants'

export const redirectTool = tool({
  description: 'Redirige a la página de nueva consulta',
  parameters: z
    .object({
      page: z.enum(['new', 'agents', 'permissions', 'settings']).describe('La página a la que se redirige'),
    })
    .describe('Redirige a la página de nueva consulta'),
  execute: async ({ page }) => {
    if (page === 'new') return NAV_URLS.AGENTS.NEW
    if (page === 'agents') return NAV_URLS.AGENTS.LIST
    if (page === 'permissions') return NAV_URLS.ADMIN.PERMISSIONS
    if (page === 'settings') return NAV_URLS.ADMIN.SETTINGS
    return NAV_URLS.AGENTS.NEW
  },
})

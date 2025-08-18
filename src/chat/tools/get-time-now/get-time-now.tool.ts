import { z } from 'zod'
import { tool } from 'ai'

export const getTimeNowTool = tool({
  description: 'Devuelve la fecha y hora actual',
  parameters: z.object({}).describe('Devuelve la fecha y hora actual'),
  execute: async () => {
    return new Date()
  },
})

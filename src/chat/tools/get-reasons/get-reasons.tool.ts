import { tool } from 'ai'
import { z } from 'zod'

export const getReasonConsultation = tool({
  description: 'Motivos de consulta para la cita (getReasonConsultation)',
  parameters: z.object({}).describe('Motivos de consulta para la cita'),
  execute: async () => [
    {
      id: 30,
      description: 'Medicina facial',
      area_id: 2,
    },
    {
      id: 31,
      description: 'Medicina corporal',
      area_id: 2,
    },
    {
      id: 9,
      description: 'Microinjertos',
      area_id: 2,
    },
    {
      id: 52,
      description: 'Liposucción Alta Definición',
      area_id: 2,
    },
    {
      id: 32,
      description: 'Depilación láser',
      area_id: 2,
    },
    {
      id: 2,
      description: 'Cirugía corporal',
      area_id: 2,
    },
    {
      id: 3,
      description: 'Cirugía pecho',
      area_id: 2,
    },
    {
      id: 1,
      description: 'Cirugía facial',
      area_id: 2,
    },
    {
      id: 138,
      description: 'Perder peso',
      area_id: 2,
    },
    {
      id: 280,
      description: 'Dorsia Prime',
      area_id: 2,
    },
    {
      id: 50,
      description: 'Aumento de pecho',
      area_id: 2,
    },
  ],
})

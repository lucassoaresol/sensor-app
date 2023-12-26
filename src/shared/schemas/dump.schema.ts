import { z } from 'zod'

export const localeDumpSchema = z.object({
  dump: z.object(
    { id: z.number(), lat: z.number(), long: z.number() },
    { required_error: 'Lixeira obrigatória' },
  ),
})

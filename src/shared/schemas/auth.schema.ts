import { z } from 'zod'

export const loginSchema = z.object({
  email: z
    .string({ required_error: 'Email obrigatório' })
    .min(1, 'Email obrigatório'),
  password: z
    .string({ required_error: 'Senha obrigatória' })
    .min(1, 'Senha obrigatória'),
})

export const recoverySchema = z.object({
  email: z
    .string({ required_error: 'Email obrigatório' })
    .min(1, 'Email obrigatório'),
})

export const passwordVerifySchema = z.object({
  password: z
    .string({ required_error: 'Senha obrigatória' })
    .min(1, 'Senha obrigatória'),
})

// src/env/index.ts
import 'dotenv/config'
import { z } from 'zod'

const envSchema = z.object({
  NODE_ENV: z.enum(['dev', 'test', 'production']).default('dev'),
  PORT: z.coerce.number().default(3333),
  JWT_SECRET: z.string().min(20),             
  JWT_EXPIRES_IN: z.coerce.number().default(900),
})

const parsed = envSchema.safeParse(process.env)
if (!parsed.success) {
  console.error(parsed.error.format())
  throw new Error('Invalid environment variable.')
}
export const env = parsed.data  

//Imporante para definir as variaveis de ambiente
import 'dotenv/config'
//A biblioteca zod serve para validar dados, definir um 'schema'(modelo) ou ate mesmo tipar dados
import { z } from 'zod'

//Aqui eu estou definindo um modelo do meu env
const envSchema = z.object({
  NODE_ENV: z.enum(['dev', 'test', 'production']).default('dev'), //estou dizendo que o NODE_ENV tem q ser alguma dessas strings
  PORT: z.number().default(3333), //aqui eu digo que a porta pode ser um numero e caso não seja vai ser 3333
})

const _env = envSchema.safeParse(process.env)
//faço a validação do env e envio um aviso caso tenha erro
if (_env.success === false) {
  console.error('Invalid environment variable', _env.error.format())

  throw new Error('Invalid environment variable.')
}

export const env = _env.data

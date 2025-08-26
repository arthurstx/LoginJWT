import fastify from 'fastify'
import { appRoutes } from './http/routes.js'
import { ZodError, z } from 'zod' // corrige a importação
import { env } from './env/index.js'

export const app = fastify()
app.register(appRoutes)

app.setErrorHandler((error, _, resp) => {
  console.error('🔥 ERROR CAPTURADO:', error)
  if (error instanceof ZodError) {
    // Exemplo de formatação com opções:
    const tree = z.treeifyError(error)
    // ou const pretty = z.prettifyError(error)
    // ou const flat = z.flattenError(error)

    return resp.status(400).send({
      message: 'Validation error.',
      issues: error.issues, // array original (cru)
      tree, // estrutura hierárquica (uso mais comum em objetos grandes)
      // pretty,                 // mensagem legível (ideal para logs ou resposta textual)
      // flat,                   // formato simples para campos em formulários
    })
  }

  if (env.NODE_ENV !== 'production') {
    console.error(error)
  }
  return resp.status(500).send({ message: 'Internal server error.' })
})

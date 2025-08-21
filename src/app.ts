import fastify from 'fastify'
import { appRoutes } from './http/routes.js'
import { treeifyError } from 'node_modules/zod/v4/core/errors.js'
import { ZodRealError } from 'zod'
import { env } from './env/index.js'

export const app = fastify()

app.register(appRoutes)

app.setErrorHandler((error, _, resp) => {
  if (error instanceof ZodRealError) {
    return resp
      .status(400)
      .send({ message: 'Validation error.', issues: treeifyError(error) })
  }

  if (env.NODE_ENV != 'production') {
    console.error(error)
  }

  return resp.status(500).send({ message: 'Internal server error.' })
})

import { z } from 'zod'
import type { FastifyRequest, FastifyReply } from 'fastify'
import { InvalidCredentialsError } from '@/services/error/invalid-credentials-error.js'
import { makeFindPersonByNameUseCase } from '@/services/factories/make-find-person-by-name-use-case.js'

async function authenticate(req: FastifyRequest, rep: FastifyReply) {
  const authenticateBodySchema = z.object({
    name: z.string(),
    page: z.number(),
  })
  const { name, page } = authenticateBodySchema.parse(req.body)

  try {
    const authenticateUseCase = makeFindPersonByNameUseCase()

    await authenticateUseCase.execute({
      name,
      page,
    })
  } catch (err) {
    if (err instanceof Error) {
      return rep.status(409).send({ message: err.message })
    }
    throw err
  }
  return rep.status(201).send()
}

import { z } from 'zod'
import type { FastifyRequest, FastifyReply } from 'fastify'
import { makeFindPersonByNameUseCase } from '@/services/factories/make-find-person-by-name-use-case.js'

export async function findPersonByName(req: FastifyRequest, rep: FastifyReply) {
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

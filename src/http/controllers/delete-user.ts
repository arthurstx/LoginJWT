import { z } from 'zod'
import type { FastifyRequest, FastifyReply } from 'fastify'
import { makeDeleteUserteUseCase } from '@/services/factories/make-delete-user-use-case.js'
import { UserIdDoesNotExists } from '@/services/error/user-id-does-not-exist.js'

export async function deleteUser(req: FastifyRequest, rep: FastifyReply) {
  const authenticateBodySchema = z.object({
    id: z.uuid(),
  })
  const { id } = authenticateBodySchema.parse(req.body)

  try {
    const authenticateUseCase = makeDeleteUserteUseCase()

    await authenticateUseCase.execute({
      id,
    })
  } catch (err) {
    if (err instanceof UserIdDoesNotExists) {
      return rep.status(409).send({ message: err.message })
    }
    throw err
  }
  return rep.status(201).send()
}

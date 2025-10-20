import { z } from 'zod'
import type { Request, Response } from 'express'
import { makeDeleteUserteUseCase } from '../../services/factories/make-delete-user-use-case.js'
import { UserIdDoesNotExists } from '../../services/error/user-id-does-not-exist.js'

export async function deleteUser(req: Request, rep: Response) {
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

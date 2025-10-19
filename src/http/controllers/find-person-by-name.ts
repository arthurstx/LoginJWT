import { z } from 'zod'
import type { Request, Response } from 'express'

import { makeFindPersonByNameUseCase } from '@/services/factories/make-find-person-by-name-use-case.js'

export async function findPersonByName(req: Request, rep: Response) {
  // validação dos query params
  const querySchema = z.object({
    name: z.string(),
    page: z.coerce.number(), // converte automaticamente string → number
  })

  try {
    const { name, page } = querySchema.parse(req.query)

    const useCase = makeFindPersonByNameUseCase()
    const result = await useCase.execute({ name, page })

    return rep.status(200).send(result)
  } catch (err) {
    if (err instanceof Error) {
      return rep.status(409).send({ message: err.message })
    }
    throw err
  }
  return rep.status(200).send()
}

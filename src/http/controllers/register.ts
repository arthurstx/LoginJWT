import { z } from 'zod'
import type { FastifyRequest, FastifyReply } from 'fastify'
import { makeRegisterUseCase } from '@/services/factories/make-register-use-case.js'
import { UserAlreadyExistsError } from '@/services/error/user-already-exists.js'

async function authenticate(req: FastifyRequest, rep: FastifyReply) {
  const authenticateBodySchema = z.object({
    name: z.string(),
    email: z.email(),
    password: z.string().min(6),
  })
  const { name, email, password } = authenticateBodySchema.parse(req.body)

  try {
    const registerUserCase = makeRegisterUseCase()

    await registerUserCase.execute({
      name,
      email,
      password,
    })
  } catch (err) {
    if (err instanceof UserAlreadyExistsError) {
      return rep.status(409).send({ message: err.message })
    }
    throw err
  }
  return rep.status(201).send()
}

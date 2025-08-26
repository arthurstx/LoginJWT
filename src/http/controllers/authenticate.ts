import { z } from 'zod'
import type { FastifyRequest, FastifyReply } from 'fastify'
import { makeAuthenticateUseCase } from '@/services/factories/make-authenticate-use-case.js'
import { InvalidCredentialsError } from '@/services/error/invalid-credentials-error.js'

async function authenticate(req: FastifyRequest, rep: FastifyReply) {
  const authenticateBodySchema = z.object({
    email: z.email(),
    password: z.string().min(6),
  })
  const { email, password } = authenticateBodySchema.parse(req.body)

  try {
    const authenticateUseCase = makeAuthenticateUseCase()

    await authenticateUseCase.execute({
      email,
      password,
    })
  } catch (err) {
    if (err instanceof InvalidCredentialsError) {
      return rep.status(409).send({ message: err.message })
    }
    throw err
  }
  return rep.status(200).send()
}

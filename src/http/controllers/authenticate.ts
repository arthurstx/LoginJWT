// src/http/controllers/authenticate.ts
import { z } from 'zod'
import type { Request, Response } from 'express'
import * as jwt from 'jsonwebtoken'           
import type { SignOptions } from 'jsonwebtoken' 
import { makeAuthenticateUseCase } from '@/services/factories/make-authenticate-use-case.js'
import { InvalidCredentialsError } from '@/services/error/invalid-credentials-error.js'
import { env } from '@/env/index.js'

export async function authenticate(req: Request, rep: Response) {
  const schema = z.object({
    email: z.email(),
    password: z.string().min(6),
  })
  const { email, password } = schema.parse(req.body)

  try {
    const { user } = await makeAuthenticateUseCase().execute({
      email,
      password,
    })

    const jwtOptions: SignOptions = {
      subject: user.id, 
      expiresIn: env.JWT_EXPIRES_IN,
    }

    const token = jwt.sign(
      { email: user.email, name: user.name }, 
      env.JWT_SECRET, 
      jwtOptions
    )

    return rep.status(200).send({ token })
  } catch (err) {
    if (err instanceof InvalidCredentialsError) {
      return rep.status(409).send({ message: err.message })
    }
    throw err
  }
}

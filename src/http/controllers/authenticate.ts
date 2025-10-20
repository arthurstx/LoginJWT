// src/http/controllers/authenticate.ts
import { z } from 'zod'
import type { Request, Response } from 'express'
import jwt, { type SignOptions } from 'jsonwebtoken'   // ✅ default import


import { env } from '@/env/index.js'
import { makeAuthenticateUseCase } from '@/services/factories/make-authenticate-use-case.js'
import { InvalidCredentialsError } from '@/services/error/invalid-credentials-error.js'
 // sem .js no source; o tsup resolve

export async function authenticate(req: Request, res: Response) {
  const schema = z.object({
    email: z.email(),                 // ok no Zod novo
    password: z.string().min(6),
  })
  const { email, password } = schema.parse(req.body)

  try {
    const { user } = await makeAuthenticateUseCase().execute({ email, password })

    const opts: SignOptions = { subject: user.id, expiresIn: env.JWT_EXPIRES_IN } // segundos
    const token = jwt.sign(                         // ✅ usa jwt (default)
      { email: user.email, name: user.name },
      env.JWT_SECRET,
      opts
    )

    return res.status(200).json({ token })
  } catch (err) {
    if (err instanceof InvalidCredentialsError) {
      return res.status(409).json({ message: err.message })
    }
    throw err
  }
}

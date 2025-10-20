// src/app.ts
import express from 'express'

import cookieParser from 'cookie-parser'
import { ZodError } from 'zod'
import { routes } from './http/routes.js'

export const app = express()

app.use(express.json())
app.use(cookieParser())

app.use(routes)

app.use(
  (
    err: unknown,
    _req: express.Request,
    res: express.Response,
    _next: express.NextFunction
  ) => {
    if (err instanceof ZodError)
      return res
        .status(400)
        .json({ message: 'Validation error.', issues: err.issues })
    if (process.env.NODE_ENV !== 'production') console.error(err)
    return res.status(500).json({ message: 'Internal server error.' })
  }
)

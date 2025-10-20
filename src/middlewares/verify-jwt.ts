import { env } from '@/env/index.js'
import type { Request, Response, NextFunction } from 'express'
import type { JwtPayload } from 'jsonwebtoken'
import { createRequire } from 'node:module'

const require = createRequire(import.meta.url)
const JWT = require('jsonwebtoken') as typeof import('jsonwebtoken')


export function verifyJWT(req: Request, res: Response, next: NextFunction) {
  const auth = req.header('authorization')
  if (!auth?.startsWith('Bearer ')) return res.status(401).json({ message: 'Missing or invalid token' })
  const token = auth.slice('Bearer '.length)

  try {
    const payload = JWT.verify(token, env.JWT_SECRET) as JwtPayload & { sub?: string }
    if (!payload.sub) return res.status(401).json({ message: 'Token missing subject' })
    req.userId = payload.sub
    next()
  } catch {
    return res.status(401).json({ message: 'Token invalid or expired' })
  }
}

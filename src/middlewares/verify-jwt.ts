import { env } from '../env/index.js'
import type { Request, Response, NextFunction } from 'express'
import jwt, { type JwtPayload } from 'jsonwebtoken'

export function verifyJWT(req: Request, res: Response, next: NextFunction) {
  const auth = req.header('authorization') || req.get('authorization')
  if (!auth?.startsWith('Bearer ')) {
    return res.status(401).json({ message: 'Missing or invalid token' })
  }
  const token = auth.slice('Bearer '.length)

  try {
    const payload = jwt.verify(token, env.JWT_SECRET) as JwtPayload & {
      sub?: string
    }
    if (!payload?.sub)
      return res.status(401).json({ message: 'Token missing subject' })

    req.userId = payload.sub
    return next()
  } catch {
    return res.status(401).json({ message: 'Token invalid or expired' })
  }
}

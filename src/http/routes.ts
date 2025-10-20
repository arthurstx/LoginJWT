import { Router } from 'express'
import { authenticate } from './controllers/authenticate.js'
import { register } from './controllers/register.js'
import { me } from './controllers/me.js'
import { findPersonByName } from './controllers/find-person-by-name.js'
import { deleteUser } from './controllers/delete-user.js'
import { verifyJWT } from '../.../../middlewares/verify-jwt.js'
import { prisma } from 'src/lib/prisma.js'

export const routes = Router()

routes.get('/health', (_req, res) => res.json({ ok: true }))

// públicas
routes.post('/register', register)
routes.post('/login', authenticate)
routes.get('/health', (_req,res)=>res.json({ok:true}))
routes.get('/db-ping', async (_req, res) => {
  try {
    await prisma.$runCommandRaw({ ping: 1 } as any)
    return res.json({ db: 'ok' })
  } catch (e: any) {
    console.error('[DB PING ERROR]', e)
    return res.status(500).json({ db: 'fail', error: String(e?.message ?? e) })
  }
})

// autenticadas
routes.get('/me', verifyJWT, me)
routes.get('/find-person', verifyJWT, findPersonByName)
routes.delete('/', verifyJWT, deleteUser)

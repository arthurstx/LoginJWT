import { Router } from 'express'
import { authenticate } from './controllers/authenticate.js'
import { register } from './controllers/register.js'
import { me } from './controllers/me.js'
import { findPersonByName } from './controllers/find-person-by-name.js'
import { deleteUser } from './controllers/delete-user.js'
import { verifyJWT } from '../.../../middlewares/verify-jwt.js'

export const routes = Router()

routes.get('/health', (_req, res) => res.json({ ok: true }))

// públicas
routes.post('/register', register)
routes.post('/login', authenticate)

// autenticadas
routes.get('/me', verifyJWT, me)
routes.get('/find-person', verifyJWT, findPersonByName)
routes.delete('/', verifyJWT, deleteUser)

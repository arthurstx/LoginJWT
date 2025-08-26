import type { FastifyInstance } from 'fastify'
import { register } from './controllers/register.js'
import { authenticate } from './controllers/authenticate.js'
import { findPersonByName } from './controllers/find-person-by-name.js'
import { deleteUser } from './controllers/delete-user.js'

export async function appRoutes(app: FastifyInstance) {
  app.post('/register', register)
  app.post('/login', authenticate)
  app.get('/find-person', findPersonByName)
  app.delete('/', deleteUser)
}

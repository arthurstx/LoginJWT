import type { FastifyInstance } from 'fastify'
import { register } from './controllers/register.js'
import { authenticate } from './controllers/authenticate.js'
import { findPersonByName } from './controllers/find-person-by-name.js'
import { deleteUser } from './controllers/delete-user.js'

export async function appRoutes(app: FastifyInstance) {
  app.post('/users', register)
  app.post('/sessions', authenticate)
  app.get('/', findPersonByName)
  app.delete('/', deleteUser)
}

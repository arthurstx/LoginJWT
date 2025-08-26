import { PrismaUsersRepository } from '@/repositories/prisma/prisma-users-repository.js'
import { FindPersoByNameUseCase } from '../find-person-by-name.js'

export function makeFindPersonByNameUseCase() {
  const prismaUsersRepository = new PrismaUsersRepository()
  const findPersonByName = new FindPersoByNameUseCase(prismaUsersRepository)
  return findPersonByName
}

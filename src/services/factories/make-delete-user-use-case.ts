import { PrismaUsersRepository } from '@/repositories/prisma/prisma-users-repository.js'
import { DeleteUsersUseCase } from '../delete-user.js'

export function makeDeleteUserteUseCase() {
  const prismaUsersRepository = new PrismaUsersRepository()
  const deleteUser = new DeleteUsersUseCase(prismaUsersRepository)
  return deleteUser
}

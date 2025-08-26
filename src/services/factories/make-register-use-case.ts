import { PrismaUsersRepository } from '@/repositories/prisma/prisma-users-repository.js'
import { RegisterUserCase } from '../register.js'

export function makeRegisterUseCase() {
  const prismaUsersRepository = new PrismaUsersRepository()
  const register = new RegisterUserCase(prismaUsersRepository)
  return register
}

import { prisma } from '@/lib/prisma.js'
import { Prisma } from '@prisma/client'
import type { UserRepository } from '../users-repository.js'

export class PrismaUsersRepository implements UserRepository {
  async findByName(name: string, page: number) {
    const list = await prisma.user.findMany({
      where: { name: name },
      take: 20,
      skip: (page - 1) * 20,
    })
    return list.length > 0 ? list : null
  }

  async findById(id: string) {
    const user = await prisma.user.findUnique({
      where: {
        id,
      },
    })
    return user
  }
  async findByEmail(email: string) {
    const user = await prisma.user.findUnique({
      where: {
        email,
      },
    })
    return user
  }
  async create(data: Prisma.UserCreateInput) {
    const user = await prisma.user.create({
      data,
    })

    return user
  }
  async delete(id: string) {
    const user = await prisma.user.delete({
      where: { id },
    })
    return user
  }
}

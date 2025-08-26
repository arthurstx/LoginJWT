import type { Prisma, User } from '@prisma/client'
import type { UserRepository } from '../users-repository.js'
import { randomUUID } from 'node:crypto'
import { UserIdDoesNotExists } from '@/services/error/user-id-does-not-exist.js'

export class InMemoryUserRepository implements UserRepository {
  public items: User[] = []

  async findByName(name: string, page: number) {
    return this.items
      .filter((item) => item.name !== null && item.name.includes(name))
      .slice((page - 1) * 20, page * 20)
  }

  async findById(id: string) {
    const user = this.items.find((item) => item.id === id)

    if (!user) {
      return null
    }
    return user
  }

  async create(data: Prisma.UserCreateInput) {
    const user = {
      id: data.id ?? randomUUID(),
      email: data.email,
      name: data.name ?? null,
      passwordHash: (data as any).passwordHash ?? '', // adjust if passwordHash is required in input
      emailVerified: false,
      createdAt: new Date(),
      updatedAt: new Date(),
    }
    this.items.push(user)
    return user
  }
  async findByEmail(email: string) {
    const user = this.items.find((item) => item.email === email)
    if (!user) {
      return null
    }
    return user
  }
  async delete(id: string) {
    const index = this.items.findIndex((item) => item.id === id)

    if (index === -1) {
      throw new UserIdDoesNotExists()
    }

    const [user] = this.items.splice(index, 1)
    // Guarantee user is always defined due to the check above
    return user!
  }
}

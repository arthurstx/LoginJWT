import type { Prisma, User } from '@prisma/client'
import type { UserRepository } from '../users-repository.js'
import { randomUUID } from 'node:crypto'

export class InMemoryUserRepository implements UserRepository {
  public items: User[] = []

  async findById(id: string) {
    const user = this.items.find((item) => item.id === id)

    if (!user) {
      return null
    }
    return user
  }

  async create(data: Prisma.UserCreateInput) {
    const user = {
      id: randomUUID(),
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
}

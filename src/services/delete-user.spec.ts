import { InMemoryUserRepository } from '@/repositories/in-memory/in-memory-register.js'
import { expect, it, beforeEach, describe } from 'vitest'
import { hash } from 'bcryptjs'
import { InvalidCredentialsError } from './error/invalid-credentials-error.js'
import { DeleteUsersUseCase } from './delete-user.js'
import { UserIdDoesNotExists } from './error/user-id-does-not-exist.js'
let userRepository: InMemoryUserRepository
let sut: DeleteUsersUseCase

describe('Delete Use case', () => {
  beforeEach(() => {
    userRepository = new InMemoryUserRepository()
    sut = new DeleteUsersUseCase(userRepository)
  })

  it('should be able to Delete user', async () => {
    await userRepository.create({
      id: 'user-1',
      name: 'maryana',
      email: 'maryana@gmail.com',
      passwordHash: await hash('123456', 6),
    })
    await userRepository.create({
      id: 'user-2',
      name: 'maryana',
      email: 'maryana@gmail.com',
      passwordHash: await hash('123456', 6),
    })

    await sut.execute({
      id: 'user-1',
    })
    expect(userRepository.items).toHaveLength(1)
  })

  it('should not be able to delete user with wrong id', async () => {
    await userRepository.create({
      id: 'user-1',
      name: 'maryana',
      email: 'maryana@gmail.com',
      passwordHash: await hash('123456', 6),
    })

    await expect(() =>
      sut.execute({
        id: 'user-2',
      })
    ).rejects.toBeInstanceOf(UserIdDoesNotExists)
  })
})

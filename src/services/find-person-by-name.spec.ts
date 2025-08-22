import { InMemoryUserRepository } from '@/repositories/in-memory/in-memory-register.js'
import { beforeEach, describe, expect, it } from 'vitest'
import { FindPersoByNameUseCase } from './find-person-by-name.js'
import { hash } from 'bcryptjs'

let userRepository: InMemoryUserRepository
let sut: FindPersoByNameUseCase

describe('find person by name Use Case', () => {
  beforeEach(() => {
    userRepository = new InMemoryUserRepository()
    sut = new FindPersoByNameUseCase(userRepository)
  })
  it('should be able to search by name', async () => {
    await userRepository.create({
      name: 'maryana',
      email: 'maryana@gmail.com',
      passwordHash: await hash('123456', 6),
    })

    const { user } = await sut.execute({
      name: 'maryana',
      page: 1,
    })
    expect(user).toHaveLength(1)
    expect(user).toEqual([expect.objectContaining({ name: 'maryana' })])
  })
})

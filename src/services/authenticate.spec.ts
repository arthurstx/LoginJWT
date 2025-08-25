import { InMemoryUserRepository } from '@/repositories/in-memory/in-memory-register.js'
import { AuthenticateUseCase } from './authenticate.js'
import { expect, it, beforeEach, describe } from 'vitest'
import { hash } from 'bcryptjs'
import { InvalidCredentialsError } from './error/invalid-credentials-error.js'
let userRepository: InMemoryUserRepository
let sut: AuthenticateUseCase

describe('Register Use case', () => {
  beforeEach(() => {
    userRepository = new InMemoryUserRepository()
    sut = new AuthenticateUseCase(userRepository)
  })

  it('should be able to authentucate', async () => {
    await userRepository.create({
      name: 'maryana',
      email: 'maryana@gmail.com',
      passwordHash: await hash('123456', 6),
    })

    const { user } = await sut.execute({
      email: 'maryana@gmail.com',
      password: '123456',
    })
    expect(user.id).toEqual(expect.any(String))
  })

  it('should not be able to authenticate with wrong email', async () => {
    await userRepository.create({
      name: 'maryana',
      email: 'maryana@gmail.com',
      passwordHash: await hash('123456', 6),
    })

    await expect(() =>
      sut.execute({
        email: 'marcos@gmail.com',
        password: '123456',
      })
    ).rejects.toBeInstanceOf(Error)
  })
  it('should not be able to authenticate with wrong password', async () => {
    await userRepository.create({
      name: 'maryana',
      email: 'maryana@gmail.com',
      passwordHash: await hash('123456', 6),
    })

    await expect(() =>
      sut.execute({
        email: 'maryana@gmail.com',
        password: '124124',
      })
    ).rejects.toBeInstanceOf(InvalidCredentialsError)
  })
})

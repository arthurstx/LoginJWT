import { InMemoryUserRepository } from '@/repositories/in-memory/in-memory-register.js'
import { beforeEach, describe, expect, it } from 'vitest'
import { RegisterUserCase } from './register.js'
import { compare } from 'bcryptjs'
import { UserAlreadyExistsError } from './error/user-already-exists.js'

let userRepository: InMemoryUserRepository
let sut: RegisterUserCase

describe('Register User Case', () => {
  beforeEach(() => {
    userRepository = new InMemoryUserRepository()
    sut = new RegisterUserCase(userRepository)
  })
  it('should be able to register', async () => {
    const { user } = await sut.execute({
      name: 'binho',
      email: 'binho@gmail.com',
      password: '123456',
    })
    expect(user.id).toEqual(expect.any(String))
  })

  it('should hash user password upon registration', async () => {
    const { user } = await sut.execute({
      name: 'binho',
      email: 'binho@gmail.com',
      password: '123456',
    })

    const isPasswordCorrectlyHashed = await compare('123456', user.passwordHash)
    console.log('------------------------------------')

    expect(isPasswordCorrectlyHashed).toBe(true)
  })
  it('should be able to register with same email twice', async () => {
    sut.execute({
      name: 'binho',
      email: 'binho@gmail.com',
      password: '123456',
    })

    await expect(() =>
      sut.execute({
        name: 'binho',
        email: 'binho@gmail.com',
        password: '123456',
      })
    ).rejects.toBeInstanceOf(UserAlreadyExistsError)
  })
})

import type { UserRepository } from '../repositories/users-repository.js'
import type { User } from '@prisma/client'
import { hash } from 'bcryptjs'
import { UserAlreadyExistsError } from './error/user-already-exists.js'

interface RegisterUseCaseRequest {
  email: string
  name: string
  password: string
}

interface RegisterUserCaseResponse {
  user: User
}

export class RegisterUserCase {
  constructor(private userRepository: UserRepository) {}

  async execute({
    name,
    email,
    password,
  }: RegisterUseCaseRequest): Promise<RegisterUserCaseResponse> {
    const passwordHash = await hash(password, 6)

    const userWithSameEmail = await this.userRepository.findByEmail(email)

    if (userWithSameEmail) {
      throw new UserAlreadyExistsError()
    }
    const user = await this.userRepository.create({
      name,
      email,
      passwordHash,
    })

    return { user }
  }
}

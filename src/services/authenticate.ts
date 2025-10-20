import type { UserRepository } from '../repositories/users-repository.js'
import type { User } from '@prisma/client'
import { compare } from 'bcryptjs'
import { InvalidCredentialsError } from './error/invalid-credentials-error.js'

interface AuthenticateUseCaseRequest {
  email: string
  password: string
}

interface AuthenticateUseCaseResponse {
  user: User
}

export class AuthenticateUseCase {
  constructor(private userRepository: UserRepository) {}
  async execute({
    email,
    password,
  }: AuthenticateUseCaseRequest): Promise<AuthenticateUseCaseResponse> {
    const user = await this.userRepository.findByEmail(email)

    if (!user) {
      throw new InvalidCredentialsError()
    }

    const doesPasswordMatchs = await compare(password, user.passwordHash)

    if (!doesPasswordMatchs) {
      throw new InvalidCredentialsError()
    }

    return { user }
  }
}

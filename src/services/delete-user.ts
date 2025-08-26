import type { UserRepository } from '@/repositories/users-repository.js'
import type { User } from '@prisma/client'
import { UserIdDoesNotExists } from './error/user-id-does-not-exist.js'

interface DeleteUsersUseCaseRequest {
  id: string
}

interface DeleteUsersUseCaseResponse {
  user: User
}

export class DeleteUsersUseCase {
  constructor(private userRepository: UserRepository) {}
  async execute({
    id,
  }: DeleteUsersUseCaseRequest): Promise<DeleteUsersUseCaseResponse> {
    const user = await this.userRepository.delete(id)

    if (!user) {
      throw new UserIdDoesNotExists()
    }

    return { user }
  }
}

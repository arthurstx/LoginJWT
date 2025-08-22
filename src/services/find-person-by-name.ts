import type { UserRepository } from '@/repositories/users-repository.js'
import type { User } from '@prisma/client'

interface FindPersoByNameUseCaseRequest {
  name: string
  page: number
}

interface FindPersoByNameUseCaseResponse {
  user: User[]
}

export class FindPersoByNameUseCase {
  constructor(private userRepository: UserRepository) {}

  async execute({
    name,
    page,
  }: FindPersoByNameUseCaseRequest): Promise<FindPersoByNameUseCaseResponse> {
    const user = (await this.userRepository.findByName(name, page)) ?? []

    return { user }
  }
}

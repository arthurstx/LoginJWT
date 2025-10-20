import type { UserRepository } from '../repositories/users-repository.js';
import type { User } from '@prisma/client';
interface DeleteUsersUseCaseRequest {
    id: string;
}
interface DeleteUsersUseCaseResponse {
    user: User;
}
export declare class DeleteUsersUseCase {
    private userRepository;
    constructor(userRepository: UserRepository);
    execute({ id, }: DeleteUsersUseCaseRequest): Promise<DeleteUsersUseCaseResponse>;
}
export {};
//# sourceMappingURL=delete-user.d.ts.map
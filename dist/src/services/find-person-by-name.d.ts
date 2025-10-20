import type { UserRepository } from '../repositories/users-repository.js';
import type { User } from '@prisma/client';
interface FindPersoByNameUseCaseRequest {
    name: string;
    page: number;
}
interface FindPersoByNameUseCaseResponse {
    user: User[];
}
export declare class FindPersoByNameUseCase {
    private userRepository;
    constructor(userRepository: UserRepository);
    execute({ name, page, }: FindPersoByNameUseCaseRequest): Promise<FindPersoByNameUseCaseResponse>;
}
export {};
//# sourceMappingURL=find-person-by-name.d.ts.map
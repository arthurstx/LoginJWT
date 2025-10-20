import type { UserRepository } from '../repositories/users-repository.js';
import type { User } from '@prisma/client';
interface RegisterUseCaseRequest {
    email: string;
    name: string;
    password: string;
}
interface RegisterUserCaseResponse {
    user: User;
}
export declare class RegisterUserCase {
    private userRepository;
    constructor(userRepository: UserRepository);
    execute({ name, email, password, }: RegisterUseCaseRequest): Promise<RegisterUserCaseResponse>;
}
export {};
//# sourceMappingURL=register.d.ts.map
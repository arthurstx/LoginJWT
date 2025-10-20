import type { UserRepository } from '../repositories/users-repository.js';
import type { User } from '@prisma/client';
interface AuthenticateUseCaseRequest {
    email: string;
    password: string;
}
interface AuthenticateUseCaseResponse {
    user: User;
}
export declare class AuthenticateUseCase {
    private userRepository;
    constructor(userRepository: UserRepository);
    execute({ email, password, }: AuthenticateUseCaseRequest): Promise<AuthenticateUseCaseResponse>;
}
export {};
//# sourceMappingURL=authenticate.d.ts.map
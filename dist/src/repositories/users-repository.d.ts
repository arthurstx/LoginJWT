import type { Prisma, User } from '@prisma/client';
export interface UserRepository {
    findByName(name: string, page: number): Promise<User[] | null>;
    findById(id: string): Promise<User | null>;
    findByEmail(email: string): Promise<User | null>;
    create(data: Prisma.UserCreateInput): Promise<User>;
    delete(id: string): Promise<User>;
}
//# sourceMappingURL=users-repository.d.ts.map
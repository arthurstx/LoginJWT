import { Prisma } from '@prisma/client';
import type { UserRepository } from '../users-repository.js';
export declare class PrismaUsersRepository implements UserRepository {
    findByName(name: string, page: number): Promise<{
        name: string;
        id: string;
        email: string;
        passwordHash: string;
        emailVerified: boolean;
        createdAt: Date;
        updatedAt: Date;
    }[] | null>;
    findById(id: string): Promise<{
        name: string;
        id: string;
        email: string;
        passwordHash: string;
        emailVerified: boolean;
        createdAt: Date;
        updatedAt: Date;
    } | null>;
    findByEmail(email: string): Promise<{
        name: string;
        id: string;
        email: string;
        passwordHash: string;
        emailVerified: boolean;
        createdAt: Date;
        updatedAt: Date;
    } | null>;
    create(data: Prisma.UserCreateInput): Promise<{
        name: string;
        id: string;
        email: string;
        passwordHash: string;
        emailVerified: boolean;
        createdAt: Date;
        updatedAt: Date;
    }>;
    delete(id: string): Promise<{
        name: string;
        id: string;
        email: string;
        passwordHash: string;
        emailVerified: boolean;
        createdAt: Date;
        updatedAt: Date;
    }>;
}
//# sourceMappingURL=prisma-users-repository.d.ts.map
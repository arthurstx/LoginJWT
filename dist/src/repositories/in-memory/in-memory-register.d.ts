import type { Prisma, User } from '@prisma/client';
import type { UserRepository } from '../users-repository.js';
export declare class InMemoryUserRepository implements UserRepository {
    items: User[];
    findByName(name: string, page: number): Promise<{
        name: string;
        id: string;
        email: string;
        passwordHash: string;
        emailVerified: boolean;
        createdAt: Date;
        updatedAt: Date;
    }[]>;
    findById(id: string): Promise<{
        name: string;
        id: string;
        email: string;
        passwordHash: string;
        emailVerified: boolean;
        createdAt: Date;
        updatedAt: Date;
    } | null>;
    create(data: Prisma.UserCreateInput): Promise<{
        id: string;
        email: string;
        name: string;
        passwordHash: any;
        emailVerified: boolean;
        createdAt: Date;
        updatedAt: Date;
    }>;
    findByEmail(email: string): Promise<{
        name: string;
        id: string;
        email: string;
        passwordHash: string;
        emailVerified: boolean;
        createdAt: Date;
        updatedAt: Date;
    } | null>;
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
//# sourceMappingURL=in-memory-register.d.ts.map
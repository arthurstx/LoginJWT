"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.PrismaUsersRepository = void 0;
const prisma_js_1 = require("../../lib/prisma.js");
class PrismaUsersRepository {
    async findByName(name, page) {
        const list = await prisma_js_1.prisma.user.findMany({
            where: {
                name: {
                    contains: name, // qualquer parte do nome
                    mode: 'insensitive', // ignora maiúsculas/minúsculas
                },
            },
            take: 20,
            skip: (page - 1) * 20,
        });
        return list.length > 0 ? list : null;
    }
    async findById(id) {
        const user = await prisma_js_1.prisma.user.findUnique({
            where: {
                id,
            },
        });
        return user;
    }
    async findByEmail(email) {
        const user = await prisma_js_1.prisma.user.findUnique({
            where: {
                email,
            },
        });
        return user;
    }
    async create(data) {
        const user = await prisma_js_1.prisma.user.create({
            data,
        });
        return user;
    }
    async delete(id) {
        const user = await prisma_js_1.prisma.user.delete({
            where: { id },
        });
        return user;
    }
}
exports.PrismaUsersRepository = PrismaUsersRepository;
//# sourceMappingURL=prisma-users-repository.js.map
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.InMemoryUserRepository = void 0;
const node_crypto_1 = require("node:crypto");
const user_id_does_not_exist_js_1 = require("../../services/error/user-id-does-not-exist.js");
class InMemoryUserRepository {
    items = [];
    async findByName(name, page) {
        return this.items
            .filter((item) => item.name !== null && item.name.includes(name))
            .slice((page - 1) * 20, page * 20);
    }
    async findById(id) {
        const user = this.items.find((item) => item.id === id);
        if (!user) {
            return null;
        }
        return user;
    }
    async create(data) {
        const user = {
            id: data.id ?? (0, node_crypto_1.randomUUID)(),
            email: data.email,
            name: data.name ?? null,
            passwordHash: data.passwordHash ?? '', // adjust if passwordHash is required in input
            emailVerified: false,
            createdAt: new Date(),
            updatedAt: new Date(),
        };
        this.items.push(user);
        return user;
    }
    async findByEmail(email) {
        const user = this.items.find((item) => item.email === email);
        if (!user) {
            return null;
        }
        return user;
    }
    async delete(id) {
        const index = this.items.findIndex((item) => item.id === id);
        if (index === -1) {
            throw new user_id_does_not_exist_js_1.UserIdDoesNotExists();
        }
        const [user] = this.items.splice(index, 1);
        // Guarantee user is always defined due to the check above
        return user;
    }
}
exports.InMemoryUserRepository = InMemoryUserRepository;
//# sourceMappingURL=in-memory-register.js.map
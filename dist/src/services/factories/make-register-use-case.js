"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.makeRegisterUseCase = makeRegisterUseCase;
const prisma_users_repository_js_1 = require("../../repositories/prisma/prisma-users-repository.js");
const register_js_1 = require("../register.js");
function makeRegisterUseCase() {
    const prismaUsersRepository = new prisma_users_repository_js_1.PrismaUsersRepository();
    const register = new register_js_1.RegisterUserCase(prismaUsersRepository);
    return register;
}
//# sourceMappingURL=make-register-use-case.js.map
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.makeAuthenticateUseCase = makeAuthenticateUseCase;
const prisma_users_repository_js_1 = require("../../repositories/prisma/prisma-users-repository.js");
const authenticate_js_1 = require("../authenticate.js");
function makeAuthenticateUseCase() {
    const prismaUsersRepository = new prisma_users_repository_js_1.PrismaUsersRepository();
    const authenticate = new authenticate_js_1.AuthenticateUseCase(prismaUsersRepository);
    return authenticate;
}
//# sourceMappingURL=make-authenticate-use-case.js.map
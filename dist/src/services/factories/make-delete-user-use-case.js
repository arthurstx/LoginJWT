"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.makeDeleteUserteUseCase = makeDeleteUserteUseCase;
const prisma_users_repository_js_1 = require("../../repositories/prisma/prisma-users-repository.js");
const delete_user_js_1 = require("../delete-user.js");
function makeDeleteUserteUseCase() {
    const prismaUsersRepository = new prisma_users_repository_js_1.PrismaUsersRepository();
    const deleteUser = new delete_user_js_1.DeleteUsersUseCase(prismaUsersRepository);
    return deleteUser;
}
//# sourceMappingURL=make-delete-user-use-case.js.map
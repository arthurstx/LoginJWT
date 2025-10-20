"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.makeFindPersonByNameUseCase = makeFindPersonByNameUseCase;
const prisma_users_repository_js_1 = require("../../repositories/prisma/prisma-users-repository.js");
const find_person_by_name_js_1 = require("../find-person-by-name.js");
function makeFindPersonByNameUseCase() {
    const prismaUsersRepository = new prisma_users_repository_js_1.PrismaUsersRepository();
    const findPersonByName = new find_person_by_name_js_1.FindPersoByNameUseCase(prismaUsersRepository);
    return findPersonByName;
}
//# sourceMappingURL=make-find-person-by-name-use-case.js.map
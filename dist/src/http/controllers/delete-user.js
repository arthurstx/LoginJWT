"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.deleteUser = deleteUser;
const zod_1 = require("zod");
const make_delete_user_use_case_js_1 = require("../../services/factories/make-delete-user-use-case.js");
const user_id_does_not_exist_js_1 = require("../../services/error/user-id-does-not-exist.js");
async function deleteUser(req, rep) {
    const authenticateBodySchema = zod_1.z.object({
        id: zod_1.z.uuid(),
    });
    const { id } = authenticateBodySchema.parse(req.body);
    try {
        const authenticateUseCase = (0, make_delete_user_use_case_js_1.makeDeleteUserteUseCase)();
        await authenticateUseCase.execute({
            id,
        });
    }
    catch (err) {
        if (err instanceof user_id_does_not_exist_js_1.UserIdDoesNotExists) {
            return rep.status(409).send({ message: err.message });
        }
        throw err;
    }
    return rep.status(201).send();
}
//# sourceMappingURL=delete-user.js.map
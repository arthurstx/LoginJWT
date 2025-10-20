"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.DeleteUsersUseCase = void 0;
const user_id_does_not_exist_js_1 = require("./error/user-id-does-not-exist.js");
class DeleteUsersUseCase {
    userRepository;
    constructor(userRepository) {
        this.userRepository = userRepository;
    }
    async execute({ id, }) {
        const user = await this.userRepository.delete(id);
        if (!user) {
            throw new user_id_does_not_exist_js_1.UserIdDoesNotExists();
        }
        return { user };
    }
}
exports.DeleteUsersUseCase = DeleteUsersUseCase;
//# sourceMappingURL=delete-user.js.map
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.RegisterUserCase = void 0;
const bcryptjs_1 = require("bcryptjs");
const user_already_exists_js_1 = require("./error/user-already-exists.js");
class RegisterUserCase {
    userRepository;
    constructor(userRepository) {
        this.userRepository = userRepository;
    }
    async execute({ name, email, password, }) {
        const passwordHash = await (0, bcryptjs_1.hash)(password, 6);
        const userWithSameEmail = await this.userRepository.findByEmail(email);
        if (userWithSameEmail) {
            throw new user_already_exists_js_1.UserAlreadyExistsError();
        }
        const user = await this.userRepository.create({
            name,
            email,
            passwordHash,
        });
        return { user };
    }
}
exports.RegisterUserCase = RegisterUserCase;
//# sourceMappingURL=register.js.map
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.AuthenticateUseCase = void 0;
const bcryptjs_1 = require("bcryptjs");
const invalid_credentials_error_js_1 = require("./error/invalid-credentials-error.js");
class AuthenticateUseCase {
    userRepository;
    constructor(userRepository) {
        this.userRepository = userRepository;
    }
    async execute({ email, password, }) {
        const user = await this.userRepository.findByEmail(email);
        if (!user) {
            throw new invalid_credentials_error_js_1.InvalidCredentialsError();
        }
        const doesPasswordMatchs = await (0, bcryptjs_1.compare)(password, user.passwordHash);
        if (!doesPasswordMatchs) {
            throw new invalid_credentials_error_js_1.InvalidCredentialsError();
        }
        return { user };
    }
}
exports.AuthenticateUseCase = AuthenticateUseCase;
//# sourceMappingURL=authenticate.js.map
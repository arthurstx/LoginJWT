"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.register = register;
const zod_1 = require("zod");
const make_register_use_case_js_1 = require("../../services/factories/make-register-use-case.js");
const user_already_exists_js_1 = require("../../services/error/user-already-exists.js");
async function register(req, rep) {
    const authenticateBodySchema = zod_1.z.object({
        name: zod_1.z.string(),
        email: zod_1.z.email(),
        password: zod_1.z.string().min(6),
    });
    const { name, email, password } = authenticateBodySchema.parse(req.body);
    try {
        const registerUserCase = (0, make_register_use_case_js_1.makeRegisterUseCase)();
        await registerUserCase.execute({
            name,
            email,
            password,
        });
    }
    catch (err) {
        if (err instanceof user_already_exists_js_1.UserAlreadyExistsError) {
            return rep.status(409).send({ message: err.message });
        }
        throw err;
    }
    return rep.status(201).send();
}
//# sourceMappingURL=register.js.map
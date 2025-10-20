"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.authenticate = authenticate;
// src/http/controllers/authenticate.ts
const zod_1 = require("zod");
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken")); // ✅ default import
const index_js_1 = require("../../env/index.js");
const make_authenticate_use_case_js_1 = require("../../services/factories/make-authenticate-use-case.js");
const invalid_credentials_error_js_1 = require("../../services/error/invalid-credentials-error.js");
// sem .js no source; o tsup resolve
async function authenticate(req, res) {
    const schema = zod_1.z.object({
        email: zod_1.z.email(), // ok no Zod novo
        password: zod_1.z.string().min(6),
    });
    const { email, password } = schema.parse(req.body);
    try {
        const { user } = await (0, make_authenticate_use_case_js_1.makeAuthenticateUseCase)().execute({ email, password });
        const opts = { subject: user.id, expiresIn: index_js_1.env.JWT_EXPIRES_IN }; // segundos
        const token = jsonwebtoken_1.default.sign(// ✅ usa jwt (default)
        { email: user.email, name: user.name }, index_js_1.env.JWT_SECRET, opts);
        return res.status(200).json({ token });
    }
    catch (err) {
        if (err instanceof invalid_credentials_error_js_1.InvalidCredentialsError) {
            return res.status(409).json({ message: err.message });
        }
        throw err;
    }
}
//# sourceMappingURL=authenticate.js.map
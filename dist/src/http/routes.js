"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.routes = void 0;
const express_1 = require("express");
const authenticate_js_1 = require("./controllers/authenticate.js");
const register_js_1 = require("./controllers/register.js");
const me_js_1 = require("./controllers/me.js");
const find_person_by_name_js_1 = require("./controllers/find-person-by-name.js");
const delete_user_js_1 = require("./controllers/delete-user.js");
const verify_jwt_js_1 = require("../../src/middlewares/verify-jwt.js");
exports.routes = (0, express_1.Router)();
exports.routes.get('/health', (_req, res) => res.json({ ok: true }));
// públicas
exports.routes.post('/register', register_js_1.register);
exports.routes.post('/login', authenticate_js_1.authenticate);
// autenticadas
exports.routes.get('/me', verify_jwt_js_1.verifyJWT, me_js_1.me);
exports.routes.get('/find-person', verify_jwt_js_1.verifyJWT, find_person_by_name_js_1.findPersonByName);
exports.routes.delete('/', verify_jwt_js_1.verifyJWT, delete_user_js_1.deleteUser);
//# sourceMappingURL=routes.js.map
"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.app = void 0;
// src/app.ts
const express_1 = __importDefault(require("express"));
const cookie_parser_1 = __importDefault(require("cookie-parser"));
const zod_1 = require("zod");
const routes_js_1 = require("./http/routes.js");
exports.app = (0, express_1.default)();
exports.app.use(express_1.default.json());
exports.app.use((0, cookie_parser_1.default)());
exports.app.use(routes_js_1.routes);
exports.app.use((err, _req, res, _next) => {
    if (err instanceof zod_1.ZodError)
        return res.status(400).json({ message: 'Validation error.', issues: err.issues });
    if (process.env.NODE_ENV !== 'production')
        console.error(err);
    return res.status(500).json({ message: 'Internal server error.' });
});
//# sourceMappingURL=app.js.map
"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.verifyJWT = verifyJWT;
const index_js_1 = require("../env/index.js");
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken")); // ✅ default import (CJS compat)
function verifyJWT(req, res, next) {
    const auth = req.header('authorization') || req.get('authorization');
    if (!auth?.startsWith('Bearer ')) {
        return res.status(401).json({ message: 'Missing or invalid token' });
    }
    const token = auth.slice('Bearer '.length);
    try {
        const payload = jsonwebtoken_1.default.verify(token, index_js_1.env.JWT_SECRET);
        if (!payload?.sub)
            return res.status(401).json({ message: 'Token missing subject' });
        req.userId = payload.sub;
        return next();
    }
    catch {
        return res.status(401).json({ message: 'Token invalid or expired' });
    }
}
//# sourceMappingURL=verify-jwt.js.map
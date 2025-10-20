"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.env = void 0;
// src/env/index.ts
require("dotenv/config");
const zod_1 = require("zod");
const envSchema = zod_1.z.object({
    NODE_ENV: zod_1.z.enum(['dev', 'test', 'production']).default('dev'),
    PORT: zod_1.z.coerce.number().default(3333),
    JWT_SECRET: zod_1.z.string().min(20),
    JWT_EXPIRES_IN: zod_1.z.coerce.number().default(900),
});
const parsed = envSchema.safeParse(process.env);
if (!parsed.success) {
    console.error(parsed.error.format());
    throw new Error('Invalid environment variable.');
}
exports.env = parsed.data;
//# sourceMappingURL=index.js.map
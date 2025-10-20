"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.prisma = void 0;
const index_js_1 = require("../env/index.js");
const client_1 = require("@prisma/client");
exports.prisma = new client_1.PrismaClient({
    log: index_js_1.env.NODE_ENV === 'dev' || 'test' ? ['query'] : [],
});
//# sourceMappingURL=prisma.js.map
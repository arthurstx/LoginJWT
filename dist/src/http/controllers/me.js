"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.me = me;
const prisma_js_1 = require("../../lib/prisma.js");
async function me(req, res) {
    const userId = req.userId;
    const user = await prisma_js_1.prisma.user.findUnique({
        where: { id: userId },
        select: { id: true, name: true, email: true, createdAt: true },
    });
    if (!user)
        return res.status(404).json({ message: 'User not found' });
    return res.json({ user });
}
//# sourceMappingURL=me.js.map
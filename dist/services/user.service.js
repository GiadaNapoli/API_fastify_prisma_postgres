"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.createUser = exports.prisma = void 0;
const client_1 = require("@prisma/client");
exports.prisma = new client_1.PrismaClient();
async function createUser(user) {
    return await exports.prisma.user.create({
        data: {
            name: user.name,
            email: user.email,
        },
    });
}
exports.createUser = createUser;

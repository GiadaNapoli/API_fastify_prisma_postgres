"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.createUser = exports.prisma = void 0;
const client_1 = require("@prisma/client");
const error_1 = require("../error/error");
exports.prisma = new client_1.PrismaClient();
async function createUser(user) {
    try {
        const newUser = await exports.prisma.user.create({ data: user });
        return newUser;
    }
    catch (e) {
        if (e.code === "P2002") {
            throw new error_1.DuplicateEntryError();
        }
        throw e;
    }
}
exports.createUser = createUser;

"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.registerUserHandler = void 0;
const user_service_1 = require("../services/user.service");
const error_1 = require("../error/error");
async function registerUserHandler(req, reply) {
    try {
        const user = req.body;
        const newUser = await (0, user_service_1.createUser)(user);
        return { data: newUser };
    }
    catch (error) {
        if (error instanceof error_1.DuplicateEntryError) {
            reply.code(409).send({ error: "Email already exists" });
        }
        else {
            reply.code(500).send({ error: "Internal Server Error" });
        }
    }
}
exports.registerUserHandler = registerUserHandler;

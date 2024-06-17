"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.registerUserHandler = void 0;
const user_service_1 = require("../services/user.service");
async function registerUserHandler(request, reply) {
    const body = request.body;
    try {
        const user = await (0, user_service_1.createUser)(body);
        return reply.code(201).send(user);
    }
    catch (e) {
        console.log(e);
        return reply.code(500).send(e);
    }
}
exports.registerUserHandler = registerUserHandler;

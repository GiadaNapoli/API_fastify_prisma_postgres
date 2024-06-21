"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.userRoutes = void 0;
const user_controller_1 = require("../controllers/user.controller");
const user_schema_1 = require("../schema/user.schema");
const userRoutes = async (fastify) => {
    fastify.post("/user", {
        schema: {
            body: user_schema_1.createUserSchema,
            response: {
                200: user_schema_1.createUserResponseSchema,
            },
        },
        handler: user_controller_1.registerUserHandler,
    });
};
exports.userRoutes = userRoutes;

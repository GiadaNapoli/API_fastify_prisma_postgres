"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.userRoutes = void 0;
const user_controller_1 = require("../controllers/user.controller");
const user_schema_1 = require("../schema/user.schema");
const validator_shema_1 = require("../middlware/validator.shema");
const userRoutes = async (fastify) => {
    fastify.post("/user", {
        schema: {
            body: user_schema_1.createUserSchema,
            response: {
                200: user_schema_1.createUserResponseSchema,
            },
        },
        preHandler: validator_shema_1.validateSchema,
        handler: user_controller_1.registerUserHandler,
    });
};
exports.userRoutes = userRoutes;

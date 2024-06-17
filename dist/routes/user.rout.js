"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.userRoutes = void 0;
const zod_1 = require("zod");
const user_controller_1 = require("../controllers/user.controller");
const user_schema_1 = require("../schema/user.schema");
const userRoutes = async (server) => {
    server.post("/", {
        schema: {
            body: {
                name: zod_1.z.string(),
                email: zod_1.z
                    .string({
                    required_error: "Email is required",
                    invalid_type_error: "Email must be a string",
                })
                    .email(),
                post: zod_1.z.array(zod_1.z.object({
                    title: zod_1.z.string(),
                    body: zod_1.z.string(),
                    authorId: zod_1.z.string(),
                })),
            },
            response: {
                201: user_schema_1.createUserResponseSchema,
            },
        },
    }, user_controller_1.registerUserHandler);
};
exports.userRoutes = userRoutes;

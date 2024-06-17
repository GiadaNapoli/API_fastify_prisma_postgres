"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.userRoutes = void 0;
const user_controller_1 = require("../controllers/user.controller");
const user_schema_1 = require("../schema/user.schema");
async function userRoutes(server) {
    server.post("/", {
        schema: {
            body: (0, user_schema_1.$ref)("createUserSchema"),
            response: {
                201: (0, user_schema_1.$ref)("createUserResponseSchema"),
            },
        },
    }, user_controller_1.registerUserHandler);
}
exports.userRoutes = userRoutes;

"use strict";
var _a;
Object.defineProperty(exports, "__esModule", { value: true });
exports.$ref = exports.userSchemas = void 0;
const zod_1 = require("zod");
const fastify_zod_1 = require("fastify-zod");
const userCore = {
    name: zod_1.z.string(),
    email: zod_1.z
        .string({
        required_error: "Email is required",
        invalid_type_error: "Email must be a string",
    })
        .email(),
};
const createUserSchema = zod_1.z.object({
    ...userCore,
});
const createUserResponseSchema = zod_1.z.object({
    id: zod_1.z.string(),
    ...userCore,
});
_a = (0, fastify_zod_1.buildJsonSchemas)({
    createUserSchema,
    createUserResponseSchema,
}), exports.userSchemas = _a.schemas, exports.$ref = _a.$ref;

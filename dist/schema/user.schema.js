"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.createUserResponseSchema = exports.createUserSchema = exports.userCore = exports.createPostSchema = void 0;
const zod_1 = require("zod");
exports.createPostSchema = zod_1.z.object({
    title: zod_1.z.string(),
    body: zod_1.z.string().email(),
    authorId: zod_1.z.string(),
});
exports.userCore = {
    name: zod_1.z.string(),
    email: zod_1.z
        .string({
        required_error: "Email is required",
        invalid_type_error: "Email must be a string",
    })
        .email(),
    //Post: z.array(createPostSchema).optional(),
};
exports.createUserSchema = zod_1.z.object({
    ...exports.userCore,
});
exports.createUserResponseSchema = zod_1.z.object({
    id: zod_1.z.string(),
    ...exports.userCore,
});

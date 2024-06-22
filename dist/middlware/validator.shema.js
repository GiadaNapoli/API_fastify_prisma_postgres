"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.validateSchema = void 0;
const user_schema_1 = require("../schema/user.schema");
const zod_validation_error_1 = require("zod-validation-error");
const validateSchema = async (req, reply) => {
    const result = user_schema_1.createUserSchema.safeParse(req.body);
    if (!result.success) {
        return reply.status(400).send((0, zod_validation_error_1.fromZodError)(result.error).message);
    }
    else {
    }
};
exports.validateSchema = validateSchema;

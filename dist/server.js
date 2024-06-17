"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.fastify = void 0;
const fastify_1 = __importDefault(require("fastify"));
const user_rout_1 = require("./routes/user.rout");
exports.fastify = (0, fastify_1.default)({
    logger: true,
});
const PORT = 3000;
try {
    exports.fastify.listen({ port: PORT });
}
catch (error) {
    process.exit(1);
}
exports.fastify.register(user_rout_1.userRoutes, { prefix: "api/user" });

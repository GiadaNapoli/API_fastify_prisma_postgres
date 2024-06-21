"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.fastify = void 0;
const fastify_1 = __importDefault(require("fastify"));
const user_rout_1 = require("./routes/user.rout");
const pugin_1 = require("./plugin/pugin");
const sensible_1 = require("./plugin/sensible");
exports.fastify = (0, fastify_1.default)({
    logger: true,
});
const PORT = 3000;
// (async () => {
// 	try {
// 		await prisma.$connect(); // Attempt connection
// 		console.log("Connesso correttamente al database postgers"); // Success message
// 	} catch (error) {
// 		console.error("Errore durante la connessione al database:", error); // Error message
// 		process.exit(1); // Exit process with error code on failure
// 	}
// })();
exports.fastify.register(pugin_1.zodPlugin);
exports.fastify.register(sensible_1.sensiblePlugin);
exports.fastify.register(user_rout_1.userRoutes, { prefix: "/api" });
try {
    exports.fastify.listen({ port: PORT });
    console.log("you are listening on port 3000");
}
catch (error) {
    process.exit(1);
}

import Fastify from "fastify";
import { userRoutes } from "./routes/user.rout";
import { prisma } from "./services/user.service";
import { zodPlugin } from "./plugin/pugin";
import { sensiblePlugin } from "./plugin/sensible";

export const fastify = Fastify({
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

fastify.register(zodPlugin);
fastify.register(sensiblePlugin);

fastify.register(userRoutes, { prefix: "/api" });
try {
	fastify.listen({ port: PORT });
	console.log("you are listening on port 3000");
} catch (error) {
	process.exit(1);
}

import Fastify from "fastify";
import { userRoutes } from "./routes/user.rout";

export const fastify = Fastify({
	logger: true,
});
const PORT = 3000;

try {
	fastify.listen({ port: PORT });
} catch (error) {
	process.exit(1);
}

fastify.register(userRoutes, { prefix: "api/user" });

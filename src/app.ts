import { join } from "path";
import AutoLoad, { AutoloadPluginOptions } from "@fastify/autoload";
import Fastify, { FastifyServerOptions, errorCodes } from "fastify";
import { userRoutes } from "./routes/user.rout";
import { ZodError } from "zod";
import { DomainError, NotFoundError } from "./error/error";

export type AppOptions = FastifyServerOptions & Partial<AutoloadPluginOptions>;

function createApp(opts: AppOptions = {}) {
	const fastify = Fastify(opts);
	fastify.setErrorHandler(function (error, request, reply) {
		if (error instanceof ZodError) {
			reply
				.code(415)
				.send({ error: "Validation error", issues: error.issues });
		}

		if (error instanceof errorCodes["FST_ERR_NOT_FOUND"]) {
			reply.code(404).send({ error: error.message });
		}
		// if (error instanceof DuplicateEntryError) {
		//   console.error(error);
		// }
		// reply.code(409).send({ error: 'Email already exists' });
		if (error instanceof DomainError) {
			console.error(error);

			const code = error instanceof NotFoundError ? 404 : 409;
			reply.code(code).send({ error: error.message });
		} else {
			console.error(error);

			reply.code(500).send({ error: "Internal Server Error" });
		}
	});

	// Place here your custom code!

	// Do not touch the following lines
	fastify.register(userRoutes, { prefix: "/" });
	// This loads all plugins defined in plugins
	// those should be support plugins that are reused
	// through your application
	void fastify.register(AutoLoad, {
		dir: join(__dirname, "plugins"),
		options: opts,
	});

	// This loads all plugins defined in routes
	// define your routes in one of these
	void fastify.register(AutoLoad, {
		dir: join(__dirname, "routes"),
		options: opts,
	});

	return fastify;
}

export const App = {
	from: createApp,
};

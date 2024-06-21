import { join } from "path";
import AutoLoad, { AutoloadPluginOptions } from "@fastify/autoload";
import Fastify, { FastifyServerOptions } from "fastify";
import { userRoutes } from "./routes/user.rout";

export type AppOptions = FastifyServerOptions & Partial<AutoloadPluginOptions>;

function createApp(opts: AppOptions = {}) {
	const fastify = Fastify(opts);

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

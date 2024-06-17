import { registerUserHandler } from "../controllers/user.controller";
import { $ref } from "../schema/user.schema";
import { FastifyInstance } from "fastify";

export async function userRoutes(server: FastifyInstance) {
	server.post(
		"/",
		{
			schema: {
				body: $ref("createUserSchema"),
				response: {
					201: $ref("createUserResponseSchema"),
				},
			},
		},
		registerUserHandler
	);
}

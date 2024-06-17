import { z } from "zod";
import { registerUserHandler } from "../controllers/user.controller";
import {
	createUserResponseSchema,
	createUserSchema,
} from "../schema/user.schema";
import { FastifyInstance } from "fastify";

export const userRoutes = async (server: FastifyInstance) => {
	server.post(
		"/",
		{
			schema: {
				body: {
					name: z.string(),
					email: z
						.string({
							required_error: "Email is required",
							invalid_type_error: "Email must be a string",
						})
						.email(),
					post: z.array(
						z.object({
							title: z.string(),
							body: z.string(),
							authorId: z.string(),
						})
					),
				},
				response: {
					201: createUserResponseSchema,
				},
			},
		},
		registerUserHandler
	);
};

import { z } from "zod";
import { registerUserHandler } from "../controllers/user.controller";
import {
	createUserResponseSchema,
	createUserSchema,
} from "../schema/user.schema";
import fastify, { FastifyInstance } from "fastify";

export const userRoutes = async (fastify: FastifyInstance) => {
	fastify.post("/user", {
		schema: {
			body: createUserSchema,
			response: {
				200: createUserResponseSchema,
			},
		},
		handler: registerUserHandler,
	});
};

import { z } from "zod";
import { registerUserHandler } from "../controllers/user.controller";
import {
	createUserResponseSchema,
	createUserSchema,
} from "../schema/user.schema";
import fastify, { FastifyInstance } from "fastify";
import { validateSchema } from "../middlware/validator.shema";

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
	fastify.delete('/users',{
		schema:{
			params:z.object({
				id:z.string(),
			}),
			response:{
				200: z.string(),
			},
		},
		handler: deleteUserHandler;
	});
};

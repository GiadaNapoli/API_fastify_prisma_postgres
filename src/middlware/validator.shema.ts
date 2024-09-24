import { FastifyReply, FastifyRequest } from "fastify";
import { createUserSchema } from "../schema/user.schema";
import { fromZodError } from "zod-validation-error";

export const validateSchema = async (
	req: FastifyRequest,
	reply: FastifyReply
) => {
	const result = createUserSchema.safeParse(req.body);
	if (!result.success) {
		return reply.status(400).send(fromZodError(result.error).message);
	} else {
	}
};

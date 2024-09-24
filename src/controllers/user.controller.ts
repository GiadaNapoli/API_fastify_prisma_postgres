<<<<<<< HEAD
import { RouteHandler } from "fastify";
import { services } from "@repo/core";
import { deleteUser } from "../../../../../packages/core/src/services/user";

export const getUserHandler: RouteHandler<{ Params: { id: string } }> = async (
	req
) => {
	const { id } = req.params;
	const user = await services.user.findById(id);
	return { data: user };
};

export const postUserHandler: RouteHandler<{
	Body: {
		email: string;
		password?: string | undefined;
		profile?: object | undefined;
	};
}> = async (req, reply) => {
	const request = req.body;
	const user = await services.user.createUser(request);
	return { data: user };
};

export const deleteUserHandler: RouteHandler<{
	Params: { id: string };
}> = async (req, reply) => {
	const { id } = req.params;
	await deleteUser(id);
	return "user deleted";
};
=======
import { FastifyReply, FastifyRequest, FastifyInstance } from "fastify";
import { CreateUserInput } from "../schema/user.schema";
import { createUser, deleteUser } from "../services/user.service";
import { DuplicateEntryError, InvalidEntryError } from "../error/error";

export async function registerUserHandler(
	req: FastifyRequest<{
		Body: CreateUserInput;
	}>,
	reply: FastifyReply
) {
	try {
		const user = req.body;
		const newUser = await createUser(user);
		return { data: newUser };
	} catch (error) {
		if (error instanceof DuplicateEntryError) {
			reply.code(409).send({ error: "Email already exists" });
		} else {
			reply.code(500).send({ error: "Internal Server Error" });
		}
	}
}
export async function deleteUserHandler(
	req: FastifyRequest<{
		Params: { id: string };
	}>,
	reply: FastifyReply
) {
	try {
		const { id } = req.params;
		await deleteUser(id);
		return "user deleted";
	} catch (error) {
		if (error instanceof InvalidEntryError) {
			reply.code(404).send({ error: "User not found" });
		} else {
			reply.code(500).send({ error: "Internal Server Error" });
		}
	}
}
>>>>>>> d62d64bb5a790376fb9ffb65392299525c4b268b

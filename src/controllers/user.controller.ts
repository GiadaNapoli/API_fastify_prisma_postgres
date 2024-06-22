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

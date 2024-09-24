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

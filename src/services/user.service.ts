import { PrismaClient, User } from "@prisma/client";
import { CreateUserInput } from "../schema/user.schema";
export const prisma = new PrismaClient();

export async function createUser(user: CreateUserInput) {
	return await prisma.user.create({
		data: user,
	});
}

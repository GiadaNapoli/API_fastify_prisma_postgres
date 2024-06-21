import { PrismaClient, User } from "@prisma/client";
import { CreateUserInput } from "../schema/user.schema";
import { DuplicateEntryError } from "../error/error";

export const prisma = new PrismaClient();

export async function createUser(user: CreateUserInput) {
	try {
		const newUser = await prisma.user.create({ data: user });
		return newUser;
	} catch (e: any) {
		if (e.code === "P2002") {
			throw new DuplicateEntryError();
		}
		throw e;
	}
}

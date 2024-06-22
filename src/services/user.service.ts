import { PrismaClient, User } from "@prisma/client";
import { CreateUserInput } from "../schema/user.schema";
import { DuplicateEntryError, InvalidEntryError } from "../error/error";

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

export async function deleteUser(id: string) {
	try {
		await prisma.user.delete({ where: { id } });
	} catch (e: any) {
		if (e.code === "P2025") {
			throw new InvalidEntryError();
		}
		throw e;
	}
}

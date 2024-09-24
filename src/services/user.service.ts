<<<<<<< HEAD
import { User as prismaUser, prisma } from "@repo/database";
import { Prisma } from "@prisma/client";
import { DuplicateEntryError, NotFoundError } from "../../errors";import { User } from "../aggregate/aggregate";
=======
import { PrismaClient, User } from "@prisma/client";
import { CreateUserInput } from "../schema/user.schema";
import { DuplicateEntryError, InvalidEntryError } from "../error/error";
>>>>>>> d62d64bb5a790376fb9ffb65392299525c4b268b


// export async function findById(id: string) {
//   const prismaUser = await prisma.user.findUnique({ where: { id } });

//   if (prismaUser === null) {
//     return null;
//   }

//   return User.fromPrisma(prismaUser);
// }

export async function findById(id: string) {
	try {
		const prismaUser = await prisma.user.findUnique({ where: { id } });

		if (prismaUser === null) {
			return null;
		}
		return User.fromPrisma(prismaUser);
	} catch (e: any) {
		if (e.code === "P2025") {
			throw new NotFoundError("User not found");
		}
		throw e;
	}
}
export async function createUser(userData: {
	email: string;
	password?: string;
	profile?: object;
}) {
	try {
		const prismaUser = await prisma.user.create({
			data: {
				email: userData.email,
				password: userData.password ?? null,
				profile: userData.profile ?? Prisma.JsonNull,
			},
		});

		return User.fromPrisma(prismaUser);
	} catch (e: any) {
		// See prisma error reference doc
		// https://www.prisma.io/docs/orm/reference/error-reference#p2002
		if (e.code === "P2002") {
			throw new DuplicateEntryError("Email already exists");
		}

		// Rethrow the original prisma error
		throw e;
	}
}

export async function deleteUser(id: string) {
	try {
		await prisma.user.delete({ where: { id } });
	} catch (e: any) {
		if (e.code === "P2025") {
			throw new NotFoundError();
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

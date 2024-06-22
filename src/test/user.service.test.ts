import { prisma } from "../services/user.service";

describe("deleteUser", () => {
	it("should deleted user when id is existing in the db", async () => {
		const newUser = await prisma.user.create({
			data: {
				id: "user",
				name: "user",
				email: "user@gmail.com",
			},
		});

		await expect(
			userService.deleteUser(newUser.id)
		).resolves.toBeUndefined();
		const deletedUser = await prisma.user.findUnique({
			where: { id: newUser.id },
		});
		expect(deletedUser).toBeNull();
	});

	it("should throw InvalidEntryError for specific Prisma errors", async () => {
		jest.spyOn(prisma.user, "delete").mockImplementationOnce(() => {
			throw { code: "P2001" };
		});

		await expect(userService.deleteUser("1")).rejects.toThrow(
			InvalidEntryError
		);
	});

	it("should throw other error", async () => {
		jest.spyOn(prisma.user, "delete").mockImplementationOnce(() => {
			throw new Error("other error");
		});

		await expect(userService.deleteUser("1")).rejects.toThrow(Error);
	});
});

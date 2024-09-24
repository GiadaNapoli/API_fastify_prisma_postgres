import { User, prisma } from "@repo/database";
import * as userService from "../../src/services/user/service";
import { DuplicateEntryError, NotFoundError } from "../../src/errors";

describe("user", () => {
	describe("findById", () => {
		it("should return a user given an id", async () => {
			// setup the test: create a test user in the database
			const user = await prisma.user.create({
				data: {
					id: "user",
					email: "user@email.com",
				},
			});

			// execute the test
			const response = await userService.findById(user.id);

			expect(response).toMatchObject({ id: user.id, email: user.email });
			// expect(response).toEqual(expect.objectContaining(user));
		});

		it("should return null if the user does not exists", async () => {
			// execute the test
			const user = await userService.findById("not-valid");

			// validate the response
			expect(user).toBe(null);
		});
	});

	describe("createUser", () => {
		const emailInput = { email: "user@email" };

		it("should save and return registered user", async () => {
			// execute the test
			const response = await userService.createUser(emailInput);

			// prepare validation: load the new user from the database
			const user = await prisma.user.findUnique({
				where: { email: emailInput.email },
			});

			// validate the user was registered and returned correctly
			expect(response).not.toHaveProperty("password");
			expect(response).toMatchObject({ email: user!.email });
		});

		it("should create a user and return it without the password", async () => {
			const user = {
				email: "giacomino@email.com",
				password: "giacominopassword",
			};
			const response = await userService.createUser(user);
			expect(response).not.toHaveProperty("password");
			expect(response).toHaveProperty("email");
			console.log(response);
		});

		it("should create a user and return it with properties sex and birthday set to null when profile is not assigned", async () => {
			const user = {
				email: "giacomino@email.com",
				password: "giacominopassword",
			};
			const response = await userService.createUser(user);
			expect(response).toHaveProperty("profile");
			expect(response.profile.sex).toBe(null);
			expect(response.profile.birthday).toBe(null);
			console.log(response);
		});

		it("should create a user and return it with propertis sex and birthday assigned", async () => {
			const user = {
				email: "giacomino@email.com",
				password: "giacominopassword",
				profile: {
					sex: "M",
					birthday: "1990-01-01",
				},
			};
			const response = await userService.createUser(user);
			expect(response).toHaveProperty("profile");
			expect(response.profile.sex).toBe("M");
			expect(response.profile.birthday).toBe("1990-01-01");
			console.log(response);
		});

		it("should return a user with propretis sex assigned and birthday set to null", async () => {
			const user = {
				email: "giacomino@email.com",
				password: "giacominopassword",
				profile: {
					sex: "M",
				},
			};

			const response = await userService.createUser(user);
			expect(response.profile.sex).toBe(user.profile.sex);
			expect(response.profile.birthday).toBe(null);
			console.log(response);
		});

		it("should throw an error with a duplicated email", async () => {
			await prisma.user.create({
				data: {
					email: "user@email",
				},
			});

			// execute the test
			// create a user with the same email should throw the error
			await expect(userService.createUser(emailInput)).rejects.toThrow(
				DuplicateEntryError
			);
		});
	});

	describe("deleteUser", () => {
		it("should deleted user when id is existing in the db", async () => {
			const newUser = await prisma.user.create({
				data: {
					id: "user",
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
			await expect(userService.deleteUser("Utente")).rejects.toThrow(
				NotFoundError
			);
		});
	});
});

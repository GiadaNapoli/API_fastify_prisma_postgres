// src/__tests__/example.test.ts
import * as userService from "../services/user.service";

import fastify from "/server";
import { DuplicateEntryError } from "../error/error";

describe("Example Test Suite", () => {
	it("should pass this test", () => {
		expect(true).toBe(true);
	});
});

describe("POST /users", () => {
	const userData = {
		email: "useruser@example.com",
	};
	it("should create a new user", async () => {
		const res = await fastify.inject({
			method: "POST",
			url: "/users",
			payload: userData,
		});

		expect(res.statusCode).toBe(200);
		const { data } = JSON.parse(res.payload);

		expect(data).toMatchObject({ ...userData, id: expect.any(String) });
	});

	it("should return 409 for duplicate email", async () => {
		jest.spyOn(userService, "createUser").mockImplementationOnce(() => {
			throw new DuplicateEntryError("Email already exists");
		});

		const res = await fastify.inject({
			method: "POST",
			url: "/users",
			payload: {
				email: userData.email,
			},
		});

		expect(res.statusCode).toBe(409);

		expect(JSON.parse(res.payload)).toEqual({
			error: "Email already exists",
		});
	});

	it("should handle unknown errors", async () => {
		jest.spyOn(userService, "createUser").mockImplementationOnce(() => {
			throw new Error("Unknown error");
		});

		const res = await fastify.inject({
			method: "POST",
			url: "/users",
			payload: userData,
		});

		expect(res.statusCode).toBe(500);

		expect(JSON.parse(res.payload)).toEqual({
			error: "Internal Server Error",
		});
	});
});

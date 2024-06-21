import { z } from "zod";

export const createPostSchema = z.object({
	title: z.string(),
	body: z.string().email(),
	authorId: z.string(),
});

export const userCore = {
	name: z.string(),
	email: z
		.string({
			required_error: "Email is required",
			invalid_type_error: "Email must be a string",
		})
		.email(),
	//Post: z.array(createPostSchema).optional(),
};

export const createUserSchema = z.object({
	...userCore,
});

export const createUserResponseSchema = z.object({
	id: z.string(),
	...userCore,
});
export type CreateUserInput = z.infer<typeof createUserSchema>;

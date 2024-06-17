import { z } from "zod";

export const userCore = {
	name: z.string(),
	email: z
		.string({
			required_error: "Email is required",
			invalid_type_error: "Email must be a string",
		})
		.email(),
	post: z.array(
		z.object({
			title: z.string(),
			body: z.string(),
			authorId: z.string(),
		})
	),
};

export const createUserSchema = z.object({
	...userCore,
});
export const createUserResponseSchema = z.object({
	id: z.string(),
	...userCore,
});
export type CreateUserInput = z.infer<typeof createUserSchema>;
export const ZOptionalUsertSchema = createUserSchema.partial();

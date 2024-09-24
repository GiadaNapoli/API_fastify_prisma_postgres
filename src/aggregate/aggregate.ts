import { User as PrismaUser } from "@repo/database";

type User = Omit<PrismaUser, "password" | "profile"> & {
	profile: {
		sex: "M" | "F" | null;
		birthday: Date | null;
	};
};

export const User = {
	fromPrisma: (prismaUser: PrismaUser): User => {
		const profile = (prismaUser.profile as {
			sex: "M" | "F" | null;
			birthday: Date | null;
		}) ?? { sex: null, birthday: null };

		return {
			id: prismaUser.id,
			email: prismaUser.email,
			profile: {
				sex: profile.sex ?? null,
				birthday: profile.birthday ? new Date(profile.birthday) : null,
			},
		};
	},
};

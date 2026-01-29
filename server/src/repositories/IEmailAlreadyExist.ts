import type { User } from "@prisma/client";

export interface IEmailAlreadyExist {
	handle: (email: string) => Promise<User | null>;
}

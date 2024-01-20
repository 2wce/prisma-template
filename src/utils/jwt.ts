import { compare, hash } from "bcryptjs";
import { sign, verify } from "jsonwebtoken";
import { clone } from "lodash";
// eslint-disable-next-line import/no-cycle
import type { Context } from "./prisma";

interface Token {
	id: string;
}

type User = {
	id: string;
};

// get user id from auth token
export function getUserId({ request }: Context): string | undefined {
	if (request?.headers) {
		const Authorization =
			request.headers.authorization || request.headers.Authorization;

		if (Authorization) {
			const token = Authorization.replace("Bearer ", "");

			const verifiedToken = verify(token, process.env.JWT_SECRET) as Token;

			return verifiedToken?.id;
		}
	}
	return undefined;
}

// issue new token based on payload
export const issue = (payload: string | User | Buffer, jwtOptions = {}) => {
	return sign(clone(payload), process.env.JWT_SECRET, jwtOptions);
};

export const isHashed = (password: string): boolean => {
	if (typeof password !== "string" || !password) {
		return false;
	}

	return password.split("$").length === 4;
};

export const hashPassword = (password: string): Promise<string | null> => {
	return new Promise((resolve, reject) => {
		if (!password || isHashed(password)) {
			resolve(null);
		} else {
			hash(password, process.env.SALT, (err, data) => {
				if (err) {
					return reject(err);
				}
				return resolve(data);
			});
		}
	});
};

export const validatePassword = (password: string, hashedPass: string) => {
	return compare(password, hashedPass);
};

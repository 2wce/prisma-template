import { PrismaClient } from "@prisma/client";
import http from "http";
import type { MockProxy } from "jest-mock-extended";
import { mockDeep } from "jest-mock-extended";
import { getUserId } from "./jwt";

export const prisma = new PrismaClient();

export interface ContextEvent {
	headers: {
		authorization: string;
		Authorization: string;
	};
}

export interface ContextArgs {
	req: http.IncomingMessage;
	res: http.ServerResponse;
}
export interface Context {
	prisma: PrismaClient;
	req: http.IncomingMessage;
	res: http.ServerResponse;
	userId?: string;
}

export type MockContext = {
	prisma: MockProxy<PrismaClient>;
};

export const createMockContext = (): MockContext => {
	return {
		prisma: mockDeep<PrismaClient>(),
	};
};

// add prisma to context for resolvers
export function createContext({ req, res }: ContextArgs) {
	return {
		req,
		res,
		userId: getUserId(req),
		prisma,
	};
}

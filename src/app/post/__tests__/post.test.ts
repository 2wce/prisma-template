import query from "@/app/post/query";
import prisma from "@/config/database";
import { clearData, postFactory, userFactory, type Context } from "@/utils";
import { afterAll, beforeAll, expect, jest, test } from "bun:test";
import type http from "http";

let context: Context;

beforeAll(async () => {
	await clearData();

	context = {
		prisma,
		res: jest.fn() as unknown as http.ServerResponse,
		req: jest.fn() as unknown as http.IncomingMessage,
	};

	// create posts dummy data
	const posts = postFactory.build();

	// create user dummy data
	const users = userFactory.build();

	const res = await prisma.$transaction([
		prisma.post.create({
			data: posts,
		}),
		prisma.user.create({
			data: users,
		}),
	]);

	console.assert(res.length === 2);
	console.assert(
		res.every((item) => {
			return item;
		}),
	);
});

afterAll(async () => {
	await clearData();

	await prisma.$disconnect();
});

test("should return existing post if id is valid", async () => {
	const dbPost = await prisma.post.findFirst();

	if (dbPost) {
		const { id } = dbPost;
		const args = { id };

		const result = await query.post({}, args, context);

		expect(result).toBeTruthy();
		expect(result?.id).toBe(id);
	}
});

test("should return error if post does not exist", async () => {
	const id = "3000";
	const args = { id };

	const result = await query.post({}, args, context);

	expect(result).toBeFalsy();
});

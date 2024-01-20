import mutation from "@/app/post/mutation";
import prisma from "@/config/database";
import { clearData, userFactory, type Context } from "@/utils";
import type { Post } from "@prisma/client";
import { afterAll, beforeAll, expect, jest, test } from "bun:test";
import type http from "http";

let context: Context;

beforeAll(async () => {
	await clearData();

	// create user dummy data
	const data = userFactory.build({ email: "user2@email.com" });

	const user = await prisma.user.create({ data });

	context = {
		prisma,
		userId: user.id,
		res: jest.fn() as unknown as http.ServerResponse,
		req: jest.fn() as unknown as http.IncomingMessage,
	};
});

afterAll(async () => {
	await clearData();

	await prisma.$disconnect();
});

test("should update existing post if id is valid", async () => {
	const draftArgs = { input: { title: "title", content: "content" } };

	const draftResult = await mutation.createDraft({}, draftArgs, context);

	// get created post and update post
	const args = {
		input: { id: draftResult.id, title: "Hello", content: "howdy" },
	};
	const result = (await mutation.updatePost({}, args, context)) as Post;

	expect(result).toBeTruthy();

	// confirm post has been updated in db
	const updatedPost = await prisma.post.findFirst({
		where: { id: result.id },
	});

	expect(updatedPost?.title).toBe(args.input.title);
	expect(updatedPost?.content).toBe(args.input.content);
	expect(updatedPost?.id).toBe(args.input.id);
});

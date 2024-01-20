import type { Post } from "@prisma/client";
import {
	type Context,
	clearData,
	prisma,
	userFactory,
} from "../../../../../utils";
import createDraft from "../createDraft";
import updatePost from "../updatePost";

let context: Context;

beforeAll(async () => {
	await clearData();

	// create user dummy data
	const data = userFactory.build({ email: "user2@email.com" });

	const user = await prisma.user.create({ data });

	context = {
		prisma,
		userId: user.id,
	};
});

afterAll(async () => {
	await clearData();

	await prisma.$disconnect();
});

test("should update existing post if id is valid", async () => {
	const draftArgs = { input: { title: "title", content: "content" } };

	const draftResult = await createDraft({}, draftArgs, context);

	// get created post and update post
	const args = {
		input: { id: draftResult.id, title: "Hello", content: "howdy" },
	};
	const result = (await updatePost({}, args, context)) as Post;

	expect(result).toBeTruthy();

	// confirm post has been updated in db
	const updatedPost = await prisma.post.findFirst({
		where: { id: result.id },
	});

	expect(updatedPost?.title).toBe(args.input.title);
	expect(updatedPost?.content).toBe(args.input.content);
	expect(updatedPost?.id).toBe(args.input.id);
});

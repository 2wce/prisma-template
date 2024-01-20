import {
	type Context,
	clearData,
	postFactory,
	prisma,
	userFactory,
} from "@/utils";
import publish from "../publish";

let context: Context;

beforeEach(async () => {
	await clearData();

	context = {
		prisma,
	};

	// create posts dummy data
	const posts = postFactory.build();

	// create user dummy data
	const users = userFactory.build({ email: "user3@email.com" });

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

afterEach(async () => {
	await clearData();

	await prisma.$disconnect();
});

test("should publish existing post if id is valid", async () => {
	const post = await prisma.post.findFirst();

	if (post) {
		const { id } = post;
		const args = { id };

		const result = await publish({}, args, context);

		expect(result).toBeTruthy();
		expect(result.id).toBe(id);

		// confirm post is updated in db
		const updated = await prisma.post.findFirst({
			where: { id },
		});

		expect(updated?.published).toBeTruthy();
		expect(updated?.id).toBe(id);
	}
});

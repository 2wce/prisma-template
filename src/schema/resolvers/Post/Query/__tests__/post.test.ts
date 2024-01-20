import {
	Context,
	clearData,
	postFactory,
	prisma,
	userFactory,
} from "../../../../../utils";
import post from "../post";

let context: Context;

beforeAll(async () => {
	await clearData();

	context = {
		prisma,
	};

	// create posts dummy data
	const posts = postFactory.build();

	// create user dummy data
	const users = userFactory.build();

	const res = await prisma.$transaction([
		prisma.post.createMany({
			data: posts,
		}),
		prisma.user.createMany({
			data: users,
		}),
	]);

	console.assert(res.length === 2);
	console.assert(
		res.every((item) => {
			return item.count === 1;
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

		const result = await post({}, args, context);

		expect(result).toBeTruthy();
		expect(result?.id).toBe(id);
	}
});

test("should return error if post does not exist", async () => {
	const id = "3000";
	const args = { id };

	const result = await post({}, args, context);

	expect(result).toBeFalsy();
});

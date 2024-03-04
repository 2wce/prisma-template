import { clearData, postFactory, userFactory } from "@/utils";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

async function seedData() {
	try {
		await clearData();
		//create posts dummy data
		const posts = postFactory.buildList(5);

		// create user dummy data
		const user = userFactory.build();

		const newUser = await prisma.user.create({ data: user });

		// Use Promise.all to create posts concurrently
		const postPromises = posts.map((post) =>
			prisma.post.create({
				data: {
					...post,
					authorId: newUser.id,
				},
			}),
		);

		await Promise.all(postPromises);

		console.log("seed data created", { posts, user });
	} catch (error) {
		console.error("Error seeding data: ", error);
		process.exit(1);
	} finally {
		await prisma.$disconnect();
	}
}

await seedData();

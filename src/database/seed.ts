import { postFactory, userFactory } from "@/utils";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

try {
	//create posts dummy data
	const posts = postFactory.buildList(5);

	// create user dummy data
	const user = userFactory.build();

	for await (const post of posts) {
		await prisma.post.create({ data: post });
	}

	await prisma.user.create({ data: user });

	console.log("seed data created", { posts, user });
} catch (error) {
	console.error(error);
	process.exit(1);
} finally {
	await prisma.$disconnect();
}

import { postFactory, userFactory } from "@/utils";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

async function main() {
  //create posts dummy data
  const posts = postFactory.buildList(5);

  // create user dummy data
  const users = userFactory.buildList(1);

  const res = await prisma.$transaction([
    prisma.post.create({
      data: posts,
    }),
    prisma.user.create({
      data: users,
    }),
  ]);

  console.log("seed data created", { res });
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });

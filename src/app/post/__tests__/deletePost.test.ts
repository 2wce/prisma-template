import { afterEach, beforeEach, expect, jest, test } from "bun:test";
import type http from "http";
import mutation from "@/app/post/mutation";
import prisma from "@/config/database";
import { type Context, clearData, postFactory, userFactory } from "@/utils";

let context: Context;

beforeEach(async () => {
  await clearData();

  context = {
    prisma,
    res: jest.fn() as unknown as http.ServerResponse,
    req: jest.fn() as unknown as http.IncomingMessage,
  };

  // create posts dummy data
  const posts = postFactory.build();

  // create user dummy data
  const users = userFactory.build({ email: "user2@email.com" });

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

test("should delete existing post if id is valid", async () => {
  const post = await prisma.post.findFirst();

  if (post) {
    const { id } = post;

    const args = { id };

    const result = await mutation.deletePost({}, args, context);

    expect(result).toBeTruthy();
    expect(result.id).toBe(id);

    // confirm post is deleted in db
    const deletedItem = await prisma.post.findFirst({
      where: { id },
    });

    expect(deletedItem).toBeFalsy();
  }
});

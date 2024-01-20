import mutation from "@/app/post/mutation";
import prisma from "@/config/database";
import { clearData, userFactory, type Context } from "@/utils";
import { afterEach, beforeEach, expect, jest, test } from "bun:test";
import type http from "http";

let context: Context;

beforeEach(async () => {
  await clearData();

  // create user dummy data
  const data = userFactory.build({ email: "user1@email.com" });

  const user = await prisma.user.create({
    data,
  });

  context = {
    prisma,
    userId: user.id,
    res: jest.fn() as unknown as http.ServerResponse,
    req: jest.fn() as unknown as http.IncomingMessage,
  };
});

afterEach(async () => {
  await clearData();

  await prisma.$disconnect();
});

test("should create a draft post if input is valid", async () => {
  const args = { input: { title: "title", content: "content" } };

  const result = await mutation.createDraft({}, args, context);

  expect(result).toBeTruthy();
  expect(result.published).toBeFalsy();

  // confirm new post is in db
  const newPost = await prisma.post.findFirst({
    where: { id: result.id },
  });

  expect(newPost?.title).toBe(args.input.title);
  expect(newPost?.content).toBe(args.input.content);
  expect(newPost?.published).toBeFalsy();
  expect(newPost?.authorId).toBe(context.userId as string);
  expect(newPost?.id).toBe(result.id);
});

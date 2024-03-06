import prisma from "@/config/database";
import { faker } from "@faker-js/faker";
import { Prisma } from "@prisma/client";
import * as Factory from "factory.ts";

const { commerce, internet, person } = faker;

export interface TableList {
	TABLE_NAME: string;
}

export const userFactory =
	Factory.Sync.makeFactory<Prisma.UserUncheckedCreateInput>({
		name: Factory.Sync.each(() => {
			return person.firstName();
		}),
		surname: Factory.Sync.each(() => {
			return person.lastName();
		}),
		email: Factory.Sync.each((seq) => {
			return `seq_${seq}_${internet.email()}`;
		}),
		password: Factory.Sync.each(() => {
			return internet.password();
		}),
	});

export const postFactory =
	Factory.Sync.makeFactory<Prisma.PostUncheckedCreateInput>({
		title: Factory.Sync.each(() => {
			return commerce.productName();
		}),
		content: Factory.Sync.each(() => {
			return commerce.productDescription();
		}),
		published: true,
	});

export const clearData = async () => {
	try {
		const posts = await prisma.post.deleteMany();
		const users = await prisma.user.deleteMany();

		console.log({ posts, users });
	} catch (error) {
		console.error(error);
		return error;
	}
};

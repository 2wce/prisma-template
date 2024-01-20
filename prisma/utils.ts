import { faker } from "@faker-js/faker";
import { Prisma, PrismaClient, PrismaPromise } from "@prisma/client";
import * as Factory from "factory.ts";

const { commerce, internet, person } = faker;
const prisma = new PrismaClient();

interface TableList {
	TABLE_NAME: string;
}

export const userFactory = Factory.Sync.makeFactory<Prisma.UserCreateInput>({
	name: Factory.Sync.each(() => person.firstName()),
	surname: Factory.Sync.each(() => person.lastName()),
	email: Factory.Sync.each(() => internet.email()),
	password: Factory.Sync.each(() => internet.password()),
});

export const postFactory = Factory.Sync.makeFactory<Prisma.PostCreateInput>({
	title: Factory.Sync.each(() => commerce.productName()),
	content: Factory.Sync.each(() => commerce.productDescription()),
	published: true,
});

export const clearData = async () => {
	try {
		const transactions: PrismaPromise<unknown>[] = [];
		await prisma.$executeRaw`SET FOREIGN_KEY_CHECKS = 0;`;

		const tables: Array<TableList> =
			await prisma.$queryRaw`SELECT TABLE_NAME from information_schema.TABLES WHERE TABLE_SCHEMA = 'template';`;

		for (const { TABLE_NAME } of tables) {
			if (TABLE_NAME !== "_prisma_migrations") {
				try {
					transactions.push(
						prisma.$executeRawUnsafe(`TRUNCATE ${TABLE_NAME};`),
					);
				} catch (error) {
					console.log({ error });
				}
			}
		}

		await Promise.all(
			transactions.map(async (transaction) => {
				try {
					await transaction;
				} catch (error) {
					console.log({ error });
				}
			}),
		);

		await prisma.$executeRaw`SET FOREIGN_KEY_CHECKS = 1;`;
	} catch (error) {
		console.error(error);
		return error;
	}
};

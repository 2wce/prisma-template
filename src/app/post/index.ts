import type { Context } from "@/utils";
import type { Post } from "@prisma/client";
import Mutation from "./mutation";
import Query from "./query";

export default {
	Query,
	Mutation,
	Post: {
		author: (parent: Post, _args: unknown, { prisma }: Context) => {
			return prisma.post
				.findUnique({
					where: { id: parent.id },
				})
				.author();
		},
	},
	Subscription: {
		postCreated: {
			// More on pubsub below
			//subscribe: () => pubsub.asyncIterator(["POST_CREATED"]),
		},
	},
};

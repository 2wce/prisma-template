import type {
	MutationCreateDraftArgs,
	MutationDeletePostArgs,
	MutationPublishArgs,
	MutationUpdatePostArgs,
} from "@/generated";
import { formatError, type Context } from "@/utils";

export default {
	updatePost: async (
		_parent: unknown,
		{ input }: MutationUpdatePostArgs,
		{ prisma, userId }: Context,
	) => {
		try {
			/*
			 * Destructure the 'id', 'title', and 'content' from the 'input'.
			 */
			const { title, content, id } = input;

			/*
			 * If the ID of the post or the ID of the current user is not provided, throw an error.
			 */
			if (!id || !userId) {
				throw new Error("Invalid input");
			}

			/*
			 * Check if a post with the given ID that is linked to the current user exists in the database using the 'prisma' client.
			 * If the post does not exist, throw an error.
			 */
			const postExists = await prisma.post.findFirst({
				where: {
					AND: [{ id }, { author: { id: userId } }],
				},
			});

			if (!postExists) {
				throw new Error("Cannot update post");
			}

			/*
			 * If the post exists, return a promise that resolves to the updated post.
			 * The 'prisma' client is used to update the post in the database with the given ID and the provided title and content.
			 */
			return await prisma.post.update({
				where: { id },
				data: {
					...(title && { title }),
					...(content && { content }),
				},
			});
		} catch (error) {
			/*
			 * If an error occurs while trying to update the post, format the error and return it.
			 */
			formatError("updatePost", error as Error);
			return error;
		}
	},
	createDraft: (
		_parent: unknown,
		{ input }: MutationCreateDraftArgs,
		{ prisma, userId }: Context,
	) => {
		/*
		 * Destructure the 'title' and 'content' from the 'input'.
		 */
		const { title, content } = input;

		/*
		 * Return a promise that resolves to the created post.
		 * The 'prisma' client is used to create the post in the database with the given title and content, and it's not published yet.
		 * The author of the post is the current user, which is connected by their ID.
		 */
		return prisma.post.create({
			data: {
				title,
				content,
				published: false,
				author: {
					connect: { id: userId },
				},
			},
		});
	},
	deletePost: (
		_parent: unknown,
		{ id }: MutationDeletePostArgs,
		{ prisma }: Context,
	) => {
		/*
		 * Return a promise that resolves to the deleted post.
		 * The 'prisma' client is used to delete the post in the database with the given ID.
		 */
		return prisma.post.delete({
			where: { id },
		});
	},
	publish: (_parent: unknown, { id }: MutationPublishArgs, ctx: Context) => {
		/*
		 * Return a promise that resolves to the published post.
		 * The 'prisma' client from the context is used to update the post in the database with the given ID and set its 'published' field to true.
		 */
		return ctx.prisma.post.update({
			where: { id },
			data: { published: true },
		});
	},
};

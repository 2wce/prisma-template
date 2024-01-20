/*
 * Import the 'ApolloError' class from the 'apollo-server' package.
 * This class can be used to create errors that are sent to the client in the response to a GraphQL request.
 */
import { ApolloError } from "apollo-server";

/*
 * Import the 'MutationUpdatePostArgs' type.
 * This type represents the arguments for the 'updatePost' mutation in your GraphQL schema.
 */
import type { MutationUpdatePostArgs } from "../../../../generated";

/*
 * Import the 'formatError' function and the 'Context' type.
 * The 'formatError' function can be used to format errors that occur in a GraphQL resolver function.
 * The 'Context' type represents the context of a GraphQL resolver function, which includes any data that every resolver
 * function should have access to, like the current user or database access.
 */
import { type Context, formatError } from "../../../../utils";

/*
 * Export a default function that is a GraphQL resolver for updating a post by its ID.
 * This function takes three arguments: '_parent', '{ input }', and '{ prisma, userId }'.
 * '_parent' is the parent object, which is not used in this function, so it's named '_parent'.
 * '{ input }' includes the ID, title, and content of the post to update.
 * '{ prisma, userId }' includes the 'prisma' client and the ID of the current user from the context of the resolver function.
 */
export default async (
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
			throw new ApolloError("Invalid input");
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
			throw new ApolloError("Cannot update post");
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
};

/*
 * Import the 'QueryPostArgs' type.
 * This type represents the arguments for the 'post' query in your GraphQL schema.
 */
import type { QueryPostArgs } from "../../../../generated";

/*
 * Import the 'Context' type.
 * This type represents the context of a GraphQL resolver function, which includes any data that every resolver
 * function should have access to, like the current user or database access.
 */
import type { Context } from "../../../../utils";

/*
 * Export a default function that is a GraphQL resolver for getting a post by its ID.
 * This function takes three arguments: '_parent', '{ id }', and '{ prisma }'.
 * '_parent' is the parent object, which is not used in this function, so it's named '_parent'.
 * '{ id }' includes the ID of the post to get.
 * '{ prisma }' is the 'prisma' client from the context of the resolver function.
 */
export default async (
	_parent: unknown,
	{ id }: QueryPostArgs,
	{ prisma }: Context,
) => {
	try {
		/*
		 * Try to find the post with the given ID in the database using the 'prisma' client.
		 * If the post is found, return it.
		 */
		return await prisma.post.findUnique({
			where: { id },
		});
	} catch (error) {
		/*
		 * If an error occurs while trying to find the post, log the error and return it.
		 */
		console.log(error);
		return error;
	}
};

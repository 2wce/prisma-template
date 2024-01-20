/*
 * Import the 'MutationDeletePostArgs' type.
 * This type represents the arguments for the 'deletePost' mutation in your GraphQL schema.
 */
import type { MutationDeletePostArgs } from "@/generated";

/*
 * Import the 'Context' type.
 * This type represents the context of a GraphQL resolver function, which includes any data that every resolver
 * function should have access to, like the current user or database access.
 */
import type { Context } from "@/utils";

/*
 * Export a default function that is a GraphQL resolver for deleting a post by its ID.
 * This function takes three arguments: '_parent', '{ id }', and '{ prisma }'.
 * '_parent' is the parent object, which is not used in this function, so it's named '_parent'.
 * '{ id }' includes the ID of the post to delete.
 * '{ prisma }' is the 'prisma' client from the context of the resolver function.
 */
export default (
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
};

/*
 * Import the 'MutationPublishArgs' type.
 * This type represents the arguments for the 'publish' mutation in your GraphQL schema.
 */
import type { MutationPublishArgs } from "@/generated";

/*
 * Import the 'Context' type.
 * This type represents the context of a GraphQL resolver function, which includes any data that every resolver
 * function should have access to, like the current user or database access.
 */
import type { Context } from "@/utils";

/*
 * Export a default function that is a GraphQL resolver for publishing a post by its ID.
 * This function takes three arguments: '_parent', '{ id }', and 'ctx'.
 * '_parent' is the parent object, which is not used in this function, so it's named '_parent'.
 * '{ id }' includes the ID of the post to publish.
 * 'ctx' is the context of the resolver function.
 */
export default (
	_parent: unknown,
	{ id }: MutationPublishArgs,
	ctx: Context,
) => {
	/*
	 * Return a promise that resolves to the published post.
	 * The 'prisma' client from the context is used to update the post in the database with the given ID and set its 'published' field to true.
	 */
	return ctx.prisma.post.update({
		where: { id },
		data: { published: true },
	});
};

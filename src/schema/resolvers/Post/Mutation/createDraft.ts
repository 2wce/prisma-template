/*
 * Import the 'MutationCreateDraftArgs' type from the '../../../../generated' directory.
 * This type represents the arguments for the 'createDraft' mutation in your GraphQL schema.
 */
import type { MutationCreateDraftArgs } from "../../../../generated";

/*
 * Import the 'Context' type from the '../../../../utils' directory.
 * This type represents the context of a GraphQL resolver function, which includes any data that every resolver
 * function should have access to, like the current user or database access.
 */
import type { Context } from "../../../../utils";

/*
 * Export a default function that is a GraphQL resolver for creating a draft post.
 * This function takes three arguments: '_parent', '{ input }', and '{ prisma, userId }'.
 * '_parent' is the parent object, which is not used in this function, so it's named '_parent'.
 * '{ input }' includes the title and content of the post to create.
 * '{ prisma, userId }' includes the 'prisma' client and the ID of the current user from the context of the resolver function.
 */
export default (
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
};

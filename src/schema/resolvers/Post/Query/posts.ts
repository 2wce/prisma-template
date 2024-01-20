/*
 * Import the 'QueryPostsArgs' type.
 * This type represents the arguments for the 'posts' query in your GraphQL schema.
 */
import type { QueryPostsArgs } from "@/generated";

/*
 * Import the 'Context' type.
 * This type represents the context of a GraphQL resolver function, which includes any data that every resolver
 * function should have access to, like the current user or database access.
 */
import type { Context } from "@/utils";

/*
 * Export a default function that is a GraphQL resolver for getting posts based on a search term.
 * This function takes three arguments: '_parent', 'args', and 'ctx'.
 * '_parent' is the parent object, which is not used in this function, so it's named '_parent'.
 * 'args' includes the search term for the posts to get.
 * 'ctx' is the context of the resolver function.
 */
export default (_parent: unknown, args: QueryPostsArgs, ctx: Context) => {
	/*
	 * Define the 'where' object, which includes the conditions for the posts to get.
	 * If a search term is provided, the posts to get should have a title or content that contains the search term and be published.
	 * If no search term is provided, the posts to get should just be published.
	 */
	const where = args.searchTerm
		? {
				OR: [
					{ title: { contains: args.searchTerm } },
					{ content: { contains: args.searchTerm } },
				],
				published: true,
		  }
		: { published: true };

	/*
	 * Return a promise that resolves to the posts that match the conditions in the 'where' object.
	 * The 'prisma' client from the context is used to find the posts in the database.
	 */
	return ctx.prisma.post.findMany({
		where,
	});
};

/*
 * Import the 'Context' type.
 * This type represents the context of a GraphQL resolver function, which includes any data that every resolver
 * function should have access to, like the current user or database access.
 */
import type { Context } from "@/utils";

/*
 * Import the 'getUserId' function.
 * This function is used to get the ID of the current user from the request object.
 */
import { getUserId } from "@/utils";

/*
 * Export a default function that is a GraphQL resolver for getting the current user.
 * This function takes three arguments: '_parent', '_args', and 'ctx'.
 * '_parent' is the parent object, which is not used in this function, so it's named '_parent'.
 * '_args' includes any arguments passed to the query, but they're not used in this function, so they're named '_args'.
 * 'ctx' is the context of the resolver function.
 */
export default (_parent: unknown, _args: unknown, ctx: Context) => {
	/*
	 * Get the ID of the current user from the request object using the 'getUserId' function.
	 */
	const userId = getUserId(ctx.req);

	/*
	 * Return a promise that resolves to the current user.
	 * The 'prisma' client from the context is used to find the user in the database with the ID of the current user.
	 */
	return ctx.prisma.user.findUnique({
		where: {
			id: userId,
		},
	});
};

/*
 * Import the 'AuthenticationError' class from the 'apollo-server' package.
 * This class can be used to create authentication-related errors that are sent to the client in the response to a GraphQL request.
 */
import { AuthenticationError } from "apollo-server";

/*
 * Import the 'MutationLoginArgs' type from the '../../../../generated' directory.
 * This type represents the arguments for the 'login' mutation in your GraphQL schema.
 */
import type { MutationLoginArgs } from "../../../../generated";

/*
 * Import various utility functions and types from the '../../../../utils' directory.
 * These include a regular expression for validating email addresses, a function for formatting errors, a function for issuing JWTs,
 * and the 'Context' type.
 */
import {
	type Context,
	emailRegExp,
	formatError,
	issue,
} from "../../../../utils";

/*
 * Export a default function that is a GraphQL resolver for the 'login' mutation.
 * This function takes three arguments: '_parent', 'args', and '{ prisma }'.
 * '_parent' is the parent object, which is not used in this function, so it's named '_parent'.
 * 'args' includes the email of the user who wants to log in.
 * '{ prisma }' is the 'prisma' client from the context of the resolver function.
 */
export default async (
	_parent: unknown,
	args: MutationLoginArgs,
	{ prisma }: Context,
) => {
	try {
		// The identifier is required.
		if (!args.email) {
			throw new AuthenticationError("Please provide your e-mail.");
		}

		// Check if the provided email is valid or not.
		const isEmail = emailRegExp.test(args.email);

		// if valid then search for user in database
		if (isEmail) {
			const email = args.email.toLowerCase();

			// search for user by email
			const user = await prisma.user.findFirst({
				where: { email },
			});

			if (!user) {
				throw new AuthenticationError("User not found.");
			}

			// @TODO: if user found then check if password is correct

			// if correct then return user
			return issue({ id: user.id });
		}
		throw new AuthenticationError("Invalid Email Format");
	} catch (error) {
		formatError("login", error as Error);
		return error;
	}
};

/*
 * Import the 'AuthenticationError' class from the 'apollo-server' package.
 * This class can be used to create authentication-related errors that are sent to the client in the response to a GraphQL request.
 */
import { AuthenticationError } from "apollo-server";

/*
 * Import the 'MutationSignupArgs' type.
 * This type represents the arguments for the 'signup' mutation in your GraphQL schema.
 */
import type { MutationSignupArgs } from "@/generated";

/*
 * Import various utility functions and types.
 * These include a regular expression for validating email addresses, a function for formatting errors, and the 'Context' type.
 */
import { emailRegExp, formatError, type Context } from "@/utils";

/*
 * Export a default function that is a GraphQL resolver for the 'signup' mutation.
 * This function takes three arguments: '_parent', '{ input }', and '{ prisma }'.
 * '_parent' is the parent object, which is not used in this function, so it's named '_parent'.
 * '{ input }' includes the email and name of the user who wants to sign up.
 * '{ prisma }' is the 'prisma' client from the context of the resolver function.
 */
export default async (
	_parent: unknown,
	{ input }: MutationSignupArgs,
	{ prisma }: Context,
) => {
	try {
		const { email, name } = input;

		// The identifier is required.
		if (!email) {
			throw new AuthenticationError("Please provide your e-mail.");
		}

		// Check if the provided email is valid or not.
		const isEmail = emailRegExp.test(email);

		// if valid then search for user in database
		if (isEmail) {
			const formattedEmail = email.toLowerCase();

			// search for user by email
			const user = await prisma.user.findFirst({
				where: { email: formattedEmail },
			});

			// If user already exists, throw an error.
			if (user) {
				throw new AuthenticationError(
					"User exists, please use different email",
				);
			}

			// If user does not exist, create a new user with the provided email and name.
			return await prisma.user.create({
				data: {
					email,
					name,
				},
			});
		}

		// If the provided email is not valid, throw an error.
		throw new AuthenticationError("Invalid Email Format");
	} catch (error) {
		// If an error occurs while trying to sign up, format the error and return it.
		formatError("signup", error as Error);
		return error;
	}
};

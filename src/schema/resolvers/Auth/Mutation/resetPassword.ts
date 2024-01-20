/*
 * Import the 'ApolloError' and 'AuthenticationError' classes from the 'apollo-server' package.
 * These classes can be used to create errors that are sent to the client in the response to a GraphQL request.
 */
import { ApolloError, AuthenticationError } from "apollo-server";

/*
 * Import the 'MutationResetPasswordArgs' type.
 * This type represents the arguments for the 'resetPassword' mutation in your GraphQL schema.
 */
import type { MutationResetPasswordArgs } from "@/generated";

/*
 * Import various utility functions and types.
 * These include a function for validating the input for the 'resetPassword' mutation, a function for hashing passwords, a function for issuing JWTs,
 * and the 'Context' type.
 */
import {
	type Context,
	formatError,
	hasValidResetPasswordInput,
	hashPassword,
	issue,
} from "@/utils";

/*
 * Export a default function that is a GraphQL resolver for the 'resetPassword' mutation.
 * This function takes three arguments: '_parent', 'args', and '{ prisma }'.
 * '_parent' is the parent object, which is not used in this function, so it's named '_parent'.
 * 'args' includes the input for the 'resetPassword' mutation, which includes the OTP and the new password.
 * '{ prisma }' is the 'prisma' client from the context of the resolver function.
 */
export default async (
	_parent: unknown,
	args: MutationResetPasswordArgs,
	{ prisma }: Context,
) => {
	const params = args.input;

	try {
		/*
		 * If the input for the 'resetPassword' mutation is valid, find the user with the provided OTP using the 'prisma' client.
		 */
		if (hasValidResetPasswordInput(params)) {
			const user = await prisma.user.findFirst({
				where: { resetPasswordOtp: params.code },
			});

			/*
			 * If the user does not exist, throw an error.
			 */
			if (!user) {
				throw new ApolloError("Could not reset password.");
			}

			/*
			 * If the user exists, hash the new password.
			 */
			const password = await hashPassword(params.password);

			/*
			 * If the password was hashed successfully, update the user in the database using the 'prisma' client.
			 * The OTP is set to 'null' and the password is set to the hashed password.
			 */
			if (password) {
				await prisma.user.update({
					where: { id: user.id },
					data: { resetPasswordOtp: null, password },
				});
			}

			/*
			 * Return an object that includes a JWT issued for the user and the user's data.
			 */
			return {
				jwt: issue({ id: user.id }),
				user,
			};
		}

		/*
		 * If the input for the 'resetPassword' mutation is not valid, throw an error.
		 */
		throw new AuthenticationError("Incorrect params provided.");
	} catch (error) {
		/*
		 * If an error occurs while trying to reset the password, format the error and return it.
		 */
		formatError("resetPassword", error as Error);
		return error;
	}
};

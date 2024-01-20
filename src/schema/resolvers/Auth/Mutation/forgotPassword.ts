/*
 * Import the 'AuthenticationError' class from the 'apollo-server' package.
 * This class can be used to create authentication-related errors that are sent to the client in the response to a GraphQL request.
 */
import { AuthenticationError } from "apollo-server";

/*
 * Import the 'template' function from the 'lodash' package.
 * This function can be used to compile JavaScript template strings.
 */
import { template } from "lodash";

/*
 * Import the 'MutationForgotPasswordArgs' type from the '../../../../generated' directory.
 * This type represents the arguments for the 'forgotPassword' mutation in your GraphQL schema.
 */
import type { MutationForgotPasswordArgs } from "../../../../generated";

/*
 * Import various utility functions and types from the '../../../../utils' directory.
 * These include a regular expression for validating email addresses, a function for formatting errors, a function for generating random OTPs,
 * a template for the password reset email, a function for sending emails, and the 'Context' type.
 */
import {
	type Context,
	emailRegExp,
	formatError,
	generateRandomOtp,
	sendEmail,
	template as passwordReset,
} from "../../../../utils";

/*
 * Export a default function that is a GraphQL resolver for the 'forgotPassword' mutation.
 * This function takes three arguments: '_parent', 'args', and '{ prisma }'.
 * '_parent' is the parent object, which is not used in this function, so it's named '_parent'.
 * 'args' includes the email of the user who forgot their password.
 * '{ prisma }' is the 'prisma' client from the context of the resolver function.
 */
export default async (
	_parent: unknown,
	args: MutationForgotPasswordArgs,
	{ prisma }: Context,
) => {
	try {
		const { email } = args.input;

		// The identifier is required.
		if (!email) {
			throw new AuthenticationError("Please provide your e-mail.");
		}

		let identifier = "";

		// Check if the provided email is valid or not.
		const isEmail = emailRegExp.test(email);

		// if valid then set as identifier
		if (isEmail) {
			const formattedEmail = email.toLowerCase();

			identifier = formattedEmail;
		} else {
			throw new AuthenticationError("Invalid Email Format");
		}

		// search for user by email
		const user = await prisma.user.findFirst({
			where: { email: identifier },
		});

		if (!user) {
			throw new AuthenticationError("Invalid email.");
		}

		// Generate OTP token.
		let resetPasswordOtp: number | string = generateRandomOtp(5);

		// Update the user.
		await prisma.user.update({
			where: { id: user.id },
			data: { resetPasswordOtp },
		});

		// Format OTP for readability in email
		resetPasswordOtp = resetPasswordOtp.toString().split("").join(" ");

		// populate template with dynamic values
		const compiled = template(passwordReset);

		const message = compiled({
			NAME: user.name,
			OTP: resetPasswordOtp,
		});

		try {
			// Send an email to the user.
			await sendEmail(user.email, message, "Forgot Password");
		} catch (err) {
			throw new Error("Failed to send email");
		}

		return true;
	} catch (error) {
		formatError("forgotPassword", error as Error);
		return false;
	}
};

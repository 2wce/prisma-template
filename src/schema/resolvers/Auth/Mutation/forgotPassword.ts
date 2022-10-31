import { AuthenticationError } from 'apollo-server';
import { template } from 'lodash';
import { MutationForgotPasswordArgs } from '../../../../generated';
import {
  Context,
  emailRegExp,
  formatError,
  generateRandomOtp,
  passwordReset,
  sendEmail,
} from '../../../../utils';

export default async (
  _parent: unknown,
  args: MutationForgotPasswordArgs,
  { prisma }: Context,
) => {
  try {
    const { email } = args.input;

    // The identifier is required.
    if (!email) {
      throw new AuthenticationError('Please provide your e-mail.');
    }

    let identifier = '';

    // Check if the provided email is valid or not.
    const isEmail = emailRegExp.test(email);

    // if valid then set as identifier
    if (isEmail) {
      const formattedEmail = email.toLowerCase();

      identifier = formattedEmail;
    } else {
      throw new AuthenticationError('Invalid Email Format');
    }

    // search for user by email
    const user = await prisma.user.findFirst({
      where: { email: identifier },
    });

    if (!user) {
      throw new AuthenticationError('Invalid email.');
    }

    // Generate OTP token.
    let resetPasswordOtp: number | string = generateRandomOtp(5);

    // Update the user.
    await prisma.user.update({
      where: { id: user.id },
      data: { resetPasswordOtp },
    });

    // Format OTP for readability in email
    resetPasswordOtp = resetPasswordOtp.toString().split('').join(' ');

    // // populate template with dynamic values
    const compiled = template(passwordReset);

    const message = compiled({
      NAME: user.name,
      OTP: resetPasswordOtp,
    });

    try {
      // Send an email to the user.
      await sendEmail(user.email, message, 'Forgot Password');
    } catch (err) {
      throw new Error('Failed to send email');
    }

    return true;
  } catch (error) {
    formatError('forgotPassword', error);
    return false;
  }
};

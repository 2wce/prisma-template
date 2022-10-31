import { AuthenticationError } from 'apollo-server';
import { MutationSignupArgs } from '../../../../generated';
import { Context, emailRegExp, formatError } from '../../../../utils';

export default async (
  _parent: unknown,
  { input }: MutationSignupArgs,
  { prisma }: Context,
) => {
  try {
    const { email, name } = input;
    // The identifier is required.
    if (!email) {
      throw new AuthenticationError('Please provide your e-mail.');
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

      if (user) {
        throw new AuthenticationError(
          'User exists, please use different email',
        );
      }

      return await prisma.user.create({
        data: {
          email,
          name,
        },
      });
    }
    throw new AuthenticationError('Invalid Email Format');
  } catch (error) {
    formatError('signup', error);
    return error;
  }
};

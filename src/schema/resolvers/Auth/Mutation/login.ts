import { AuthenticationError } from 'apollo-server';
import { MutationLoginArgs } from '../../../../generated';
import { Context, emailRegExp, formatError, issue } from '../../../../utils';

export default async (
  _parent: unknown,
  args: MutationLoginArgs,
  { prisma }: Context,
) => {
  try {
    // The identifier is required.
    if (!args.email) {
      throw new AuthenticationError('Please provide your e-mail.');
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
        throw new AuthenticationError('User not found.');
      }

      // @TODO: if user found then check if password is correct

      // if correct then return user
      return issue({ id: user.id });
    }
    throw new AuthenticationError('Invalid Email Format');
  } catch (error) {
    formatError('login', error);
    return error;
  }
};

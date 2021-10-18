import { ApolloError, AuthenticationError } from 'apollo-server'
import { MutationResetPasswordArgs } from '../../../../generated'
import {
  Context,
  formatError,
  hashPassword,
  hasValidResetPasswordInput,
  issue,
} from '../../../../utils'

export default async (
  _parent: unknown,
  args: MutationResetPasswordArgs,
  { prisma }: Context,
) => {
  const params = args.input

  try {
    if (hasValidResetPasswordInput(params)) {
      const user = await prisma.user.findFirst({
        where: { resetPasswordOtp: params.code },
      })

      if (!user) {
        throw new ApolloError('Could not reset password.')
      }

      const password = await hashPassword(params.password)

      if (password) {
        await prisma.user.update({
          where: { id: user.id },
          data: { resetPasswordOtp: null, password },
        })
      }

      return {
        jwt: issue({ id: user.id }),
        user,
      }
    } else {
      throw new AuthenticationError('Incorrect params provided.')
    }
  } catch (error) {
    formatError('resetPassword', error)
    return error
  }
}

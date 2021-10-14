import { ApolloError, AuthenticationError } from 'apollo-server'
import { template } from 'lodash'
import {
  MutationForgotPasswordArgs,
  MutationResetPasswordArgs,
  QueryLoginArgs,
} from '../../../generated'
import {
  Context,
  emailRegExp,
  formatError,
  generateRandomOtp,
  hashPassword,
  hasValidResetPasswordInput,
  issue,
  passwordReset,
  sendEmail,
} from '../../../utils'

export default {
  Mutation: {
    login: async (
      _parent: unknown,
      args: QueryLoginArgs,
      { prisma }: Context,
    ) => {
      try {
        // The identifier is required.
        if (!args.email) {
          throw new AuthenticationError(
            'Please provide your phone number or your e-mail.',
          )
        }

        // Check if the provided email is valid or not.
        const isEmail = emailRegExp.test(args.email)

        // if valid then search for user in database
        if (isEmail) {
          const email = args.email.toLowerCase()

          // search for user by email
          const user = await prisma.user.findFirst({
            where: { email },
          })

          if (!user) {
            throw new AuthenticationError('User not found.')
          }

          // @TODO: if user found then check if password is correct

          // if correct then return user
          return issue({ id: user.id })
        } else {
          throw new AuthenticationError('Invalid Email Format')
        }
      } catch (error) {
        formatError('login', error)
        return error
      }
    },
    resetPassword: async (
      _parent: unknown,
      args: MutationResetPasswordArgs,
      { prisma }: Context,
    ) => {
      const params = args.input

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
    },
    forgotPassword: async (
      _parent: unknown,
      args: MutationForgotPasswordArgs,
      { prisma }: Context,
    ) => {
      try {
        const { email } = args.input

        // The identifier is required.
        if (!email) {
          throw new AuthenticationError('Please provide your e-mail.')
        }

        let identifier = ''

        // Check if the provided email is valid or not.
        const isEmail = emailRegExp.test(email)

        // if valid then set as identifier
        if (isEmail) {
          const formattedEmail = email.toLowerCase()

          identifier = formattedEmail
        } else {
          throw new AuthenticationError('Invalid Email Format')
        }

        // search for user by phone number
        const user = await prisma.user.findFirst({
          where: { email: identifier },
        })

        if (!user) {
          throw new AuthenticationError('Invalid phone number or email.')
        }

        // Generate OTP token.
        let resetPasswordOtp: number | string = generateRandomOtp(5)

        // Update the user.
        await prisma.user.update({
          where: { id: user.id },
          data: { resetPasswordOtp },
        })

        // Format OTP for readability in email
        resetPasswordOtp = resetPasswordOtp.toString().split('').join(' ')

        // // populate template with dynamic values
        const compiled = template(passwordReset)

        const message = compiled({
          NAME: user.name,
          OTP: resetPasswordOtp,
        })

        try {
          // Send an email to the user.
          await sendEmail(user.email, message, 'Forgot Password')
        } catch (err) {
          throw new Error('Failed to send email')
        }

        return true
      } catch (error) {
        formatError('forgotPassword', error)
        return false
      }
    },
  },
}

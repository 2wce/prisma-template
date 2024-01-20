import type {
  MutationForgotPasswordArgs,
  MutationLoginArgs,
  MutationResetPasswordArgs,
  MutationSignupArgs,
} from "@/generated";
import { template } from "lodash";

import {
  emailRegExp,
  formatError,
  generateRandomOtp,
  hasValidResetPasswordInput,
  issue,
  template as passwordReset,
  sendEmail,
  type Context,
} from "@/utils";

export default {
  login: async (
    _parent: unknown,
    args: MutationLoginArgs,
    { prisma }: Context,
  ) => {
    try {
      // The identifier is required.
      if (!args.email) {
        throw new Error("Please provide your e-mail.");
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
          throw new Error("User not found.");
        }

        // @TODO: if user found then check if password is correct

        // if correct then return user
        return issue({ id: user.id });
      }
      throw new Error("Invalid Email Format");
    } catch (error) {
      formatError("login", error as Error);
      return error;
    }
  },
  signup: async (
    _parent: unknown,
    { input }: MutationSignupArgs,
    { prisma }: Context,
  ) => {
    try {
      const { email, name } = input;

      // The identifier is required.
      if (!email) {
        throw new Error("Please provide your e-mail.");
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
          throw new Error("User exists, please use different email");
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
      throw new Error("Invalid Email Format");
    } catch (error) {
      // If an error occurs while trying to sign up, format the error and return it.
      formatError("signup", error as Error);
      return error;
    }
  },
  resetPassword: async (
    _parent: unknown,
    { input }: MutationResetPasswordArgs,
    { prisma }: Context,
  ) => {
    try {
      /*
       * If the input for the 'resetPassword' mutation is valid, find the user with the provided OTP using the 'prisma' client.
       */
      if (hasValidResetPasswordInput(input)) {
        const user = await prisma.user.findFirst({
          where: { resetPasswordOtp: input.code },
        });

        /*
         * If the user does not exist, throw an error.
         */
        if (!user) {
          throw new Error("Could not reset password.");
        }

        /*
         * If the user exists, hash the new password.
         */
        const password = await Bun.password.hash(input.password);

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
      throw new Error("Incorrect params provided.");
    } catch (error) {
      /*
       * If an error occurs while trying to reset the password, format the error and return it.
       */
      formatError("resetPassword", error as Error);
      return error;
    }
  },
  forgotPassword: async (
    _parent: unknown,
    args: MutationForgotPasswordArgs,
    { prisma }: Context,
  ) => {
    try {
      const { email } = args.input;

      // The identifier is required.
      if (!email) {
        throw new Error("Please provide your e-mail.");
      }

      let identifier = "";

      // Check if the provided email is valid or not.
      const isEmail = emailRegExp.test(email);

      // if valid then set as identifier
      if (isEmail) {
        const formattedEmail = email.toLowerCase();

        identifier = formattedEmail;
      } else {
        throw new Error("Invalid Email Format");
      }

      // search for user by email
      const user = await prisma.user.findFirst({
        where: { email: identifier },
      });

      if (!user) {
        throw new Error("Invalid email.");
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
  },
};

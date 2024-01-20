import { beforeEach, describe, expect, it } from "bun:test";

import resolvers from "@/app/auth/mutation";
import type {
  MutationForgotPasswordArgs,
  MutationResetPasswordArgs,
} from "@/generated";
import { createMockContext, type Context, type MockContext } from "@/utils";

let mockCtx: MockContext;
let context: Context;

beforeEach(() => {
  mockCtx = createMockContext();
  context = mockCtx as unknown as Context;
});

describe("Auth - Login", () => {
  it("returns an error if invalid input is parsed", async () => {
    // setup
    const { login } = resolvers;

    const args = { email: "" };

    // test
    const result = await login({}, args, context);

    // assert
    expect(result).toMatchSnapshot();
  });

  it("returns an error if only email is parsed", async () => {
    // setup
    const { login } = resolvers;

    const args = { email: "t@g.com" };

    // test
    const result = await login({}, args, context);

    // assert
    expect(result).toMatchSnapshot();
  });

  it("returns an error if email has invalid email format", async () => {
    // setup
    const { login } = resolvers;

    const args = { email: "t" };

    // test
    const result = await login({}, args, context);

    // assert
    expect(result).toMatchSnapshot();
  });
});

describe("Auth - Signup", () => {
  it("returns an error if email is empty string", async () => {
    // setup
    const { signup } = resolvers;

    const args = { input: { email: "" } };

    // test
    const result = await signup({}, args, context);

    // assert
    expect(result).toMatchSnapshot();
  });

  it("returns an error if email is incorrect format", async () => {
    // setup
    const { signup } = resolvers;

    const args = { input: { email: "t@" } };

    // test
    const result = await signup({}, args, context);

    // assert
    expect(result).toMatchSnapshot();
  });
});

describe("Auth - ForgotPassword", () => {
  it("returns an error if email is empty string", async () => {
    // setup
    const { forgotPassword } = resolvers;

    const args: MutationForgotPasswordArgs = { input: { email: "" } };

    // test
    const result = await forgotPassword({}, args, context);

    // assert
    expect(result).toMatchSnapshot();
  });

  it("returns an error if email is incorrect format", async () => {
    // setup
    const { forgotPassword } = resolvers;

    const args: MutationForgotPasswordArgs = { input: { email: "t@" } };

    // test
    const result = await forgotPassword({}, args, context);

    // assert
    expect(result).toMatchSnapshot();
  });
});

describe("Auth - ResetPassword", () => {
  it("returns an error if inputs are empty", async () => {
    // setup
    const { resetPassword } = resolvers;

    const args: MutationResetPasswordArgs = {
      input: { code: 0, password: "", passwordConfirmation: "" },
    };

    // test
    const result = await resetPassword({}, args, context);

    // assert
    expect(result).toMatchSnapshot();
  });

  it("returns an error if password does not match confirmation", async () => {
    // setup
    const { resetPassword } = resolvers;

    const args: MutationResetPasswordArgs = {
      input: {
        code: 12345,
        passwordConfirmation: "newpass",
        password: "password",
      },
    };

    // test
    const result = await resetPassword({}, args, context);

    // assert
    expect(result).toMatchSnapshot();
  });
});

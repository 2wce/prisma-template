/*
 * Import the 'User' type.
 * This type represents a user in your application.
 */
import type { User } from "@prisma/client";

/*
 * Import the 'Context' type.
 * This type represents the context of a GraphQL resolver function, which includes any data that every resolver
 * function should have access to, like the current user or database access.
 */
import type { Context } from "@/utils";

/*
 * Import the 'Query' object.
 * This object includes resolver functions for the queries defined in your GraphQL schema.
 */
import Query from "./query";

/*
 * Export an object that includes the 'Query' object and a 'User' object.
 * The 'User' object includes a 'posts' method, which is a resolver function for getting the posts of a user.
 */
export default {
  Query,
  User: {
    posts: (parent: User, _args: unknown, ctx: Context) => {
      /*
       * The 'posts' method takes three arguments: 'parent', '_args', and 'ctx'.
       * 'parent' is the user for which to get the posts.
       * '_args' includes any arguments passed to the 'posts' query, but it's not used in this function, so it's named '_args'.
       * 'ctx' is the context of the resolver function.
       *
       * The function returns a promise that resolves to the posts of the user.
       * It uses the 'prisma' client from the context to find the user in the database and get their posts.
       */
      return ctx.prisma.user
        .findUnique({
          where: { id: parent.id },
        })
        .posts();
    },
  },
};

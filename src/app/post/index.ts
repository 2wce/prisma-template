/*
 * Import the 'Post' type from the '@prisma/client' package.
 * This type represents a post in your application.
 */
import type { Post } from "@prisma/client";

/*
 * Import the 'Context' type.
 * This type represents the context of a GraphQL resolver function, which includes any data that every resolver
 * function should have access to, like the current user or database access.
 */
import type { Context } from "@/utils";

/*
 * Import the 'Mutation' and 'Query' objects.
 * These objects include resolver functions for the mutations and queries defined in your GraphQL schema.
 */
import Mutation from "./mutation";
import Query from "./query";

/*
 * Export an object that includes the 'Query' and 'Mutation' objects and a 'Post' object.
 * The 'Post' object includes an 'author' method, which is a resolver function for getting the author of a post.
 */
export default {
  Query,
  Mutation,
  Post: {
    author: (parent: Post, _args: unknown, { prisma }: Context) => {
      /*
       * The 'author' method takes three arguments: 'parent', '_args', and 'ctx'.
       * 'parent' is the post for which to get the author.
       * '_args' includes any arguments passed to the 'author' query, but it's not used in this function, so it's named '_args'.
       * 'ctx' is the context of the resolver function, which includes the 'prisma' client.
       *
       * The function returns a promise that resolves to the author of the post.
       * It uses the 'prisma' client to find the post in the database and get its author.
       */
      return prisma.post
        .findUnique({
          where: { id: parent.id },
        })
        .author();
    },
  },
};

import { ApolloServer } from "@apollo/server";
import { startStandaloneServer } from "@apollo/server/standalone";
import prisma from "./config/database";
import { getResolvers, getSchema, getUserId, type Context } from "./utils";

const server = new ApolloServer<Context>({
  typeDefs: await getSchema(),
  resolvers: await getResolvers(),
  // only enable introspection for development
  introspection: process.env.NODE_ENV === "development",
});

// Passing an ApolloServer instance to the `startStandaloneServer` function:
//  1. creates an Express app
//  2. installs your ApolloServer instance as middleware
//  3. prepares your app to handle incoming requests
const { url } = await startStandaloneServer(server, {
  listen: { port: 4000 },
  context: async ({ req, res }) => {
    return {
      req,
      res,
      userId: getUserId(req),
      prisma,
    };
  },
});

console.log(`🚀  Server ready at: ${url}`);

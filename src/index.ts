import http from "http";
import prisma from "@/config/database";
import { type Context, getResolvers, getSchema, getUserId } from "@/utils";
import { ApolloServer } from "@apollo/server";
import { expressMiddleware } from "@apollo/server/express4";
import { ApolloServerPluginDrainHttpServer } from "@apollo/server/plugin/drainHttpServer";
import { makeExecutableSchema } from "@graphql-tools/schema";
import cors from "cors";
import express from "express";
import { useServer } from "graphql-ws/lib/use/ws";
import { WebSocketServer } from "ws";

const resolvers = await getResolvers();
const typeDefs = await getSchema();

// Required logic for integrating with Express
const app = express();
// Our httpServer handles incoming requests to our Express app.
// Below, we tell Apollo Server to "drain" this httpServer,
// enabling our servers to shut down gracefully.
const httpServer = http.createServer(app);

// Creating the WebSocket server
const wsServer = new WebSocketServer({
  // This is the `httpServer` we created in a previous step.
  server: httpServer,
  // Pass a different path here if app.use
  // serves expressMiddleware at a different path
  path: "/subscriptions",
});

const schema = makeExecutableSchema({ typeDefs, resolvers });

// Hand in the schema we just created and have the
// WebSocketServer start listening.
const serverCleanup = useServer({ schema }, wsServer);

const server = new ApolloServer<Context>({
  schema,
  // only enable introspection for development
  introspection: process.env.NODE_ENV === "development",
  status400ForVariableCoercionErrors: true,
  // you can enable the following option during development to get more detailed error messages
  includeStacktraceInErrorResponses: false,
  plugins: [
    // Proper shutdown for the HTTP server.
    ApolloServerPluginDrainHttpServer({ httpServer }),

    // Proper shutdown for the WebSocket server.
    {
      async serverWillStart() {
        return {
          async drainServer() {
            await serverCleanup.dispose();
          },
        };
      },
    },
  ],
});

// Ensure we wait for our server to start
await server.start();

// Set up our Express middleware to handle CORS, body parsing,
// and our expressMiddleware function.
app.use(
  "/",
  cors<cors.CorsRequest>(),
  express.json(),
  // expressMiddleware accepts the same arguments:
  // an Apollo Server instance and optional configuration options
  expressMiddleware(server, {
    context: async ({ req, res }) => ({
      req,
      res,
      userId: getUserId(req),
      prisma,
    }),
  }),
);

// Modified server startup
await new Promise<void>((resolve) =>
  httpServer.listen({ port: process.env.PORT || 4000 }, resolve),
);
console.log("🚀 Server ready at http://localhost:4000/");

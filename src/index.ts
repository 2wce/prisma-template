import { ApolloServer } from "apollo-server";
import { schema } from "./schema";
import { createContext } from "./utils";

const server = new ApolloServer({
	schema,
	// only enable debug in development
	debug: process.env.NODE_ENV === "development",
	// only enable introspection for development
	introspection: process.env.NODE_ENV === "development",
	context: createContext,
});

// The `listen` method launches a web server.
server.listen().then(({ url }) => {
	console.log(`🚀  Server ready at ${url}`);
});

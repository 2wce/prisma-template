/*
 * Import the 'readFileSync' function from the 'fs' (file system) module.
 * This function is used to read files from the file system.
 */
import { readFileSync } from "fs";

/*
 * Import the 'resolvers' from the local file './resolvers'.
 * Resolvers define the technique for fetching the types defined in the schema.
 */
import resolvers from "./resolvers";

/*
 * Read the GraphQL schema from the 'schema.graphql' file in the same directory as this file.
 * The 'readFileSync' function is used to read the file synchronously from the file system.
 * The 'encoding' option is set to 'utf-8' to specify the encoding of the file.
 */
const typeDefs = readFileSync(`${__dirname}/schema.graphql`, {
  encoding: "utf-8",
});

/*
 * Export the 'schema' object, which includes the type definitions and resolvers.
 * The 'typeDefs' define the "shape" of your data and specify which operations can be performed on the data.
 * The 'resolvers' define how to fetch or modify this data.
 */
export const schema = {
  typeDefs,
  resolvers,
};

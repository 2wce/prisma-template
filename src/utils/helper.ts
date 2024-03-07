import { readFile, readdir } from "node:fs/promises";
import path from "path";
import type { ResetPasswordInput } from "@/generated";

export const formatError = (nameOfFunction: string, error: Error) => {
  return process.env.NODE_ENV === "test"
    ? ""
    : console.log(`----${nameOfFunction}----`, error);
};

// RegExp to check if email is valid
export const emailRegExp =
  /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|([a-zA-Z0-9-]+(\.[a-zA-Z]{2,})+))$/;

export const generateRandomOtp = (noOfDigits: number): number => {
  const multiplier = 10 ** (noOfDigits - 1);
  return Math.floor(multiplier + Math.random() * (9 * multiplier));
};

export const hasValidResetPasswordInput = (
  params: ResetPasswordInput,
): boolean => {
  const { password, passwordConfirmation, code } = params;

  // check if all values are present
  const isAllValuesPresent = Boolean(
    password &&
      passwordConfirmation &&
      code &&
      password.length > 0 &&
      passwordConfirmation.length > 0,
  );

  // check if password and password confirmation are equal
  const isPasswordEqual = Boolean(password === passwordConfirmation);

  return isAllValuesPresent && isPasswordEqual;
};

// Export a function that gets all the resolvers.
export const getResolvers = async () => {
  // Define the path to the directory that contains the resolvers.
  const directoryPath = path.join(import.meta.dir, "../app");

  // Read all files in the directory.
  // This is done recursively, so it includes files in subdirectories.
  // The 'withFileTypes' option is set to 'true', so the returned array includes 'Dirent' objects instead of strings.
  const files = await readdir(directoryPath, {
    recursive: true,
    withFileTypes: true,
  });

  // Filter the files to get only the queries and mutations.
  // This is done by using the 'isQuery' and 'isMutation' functions defined earlier.
  const resolverFiles = files.filter((file) => file.name.includes("index"));

  // Define an array to hold the resolvers.
  const resolvers = [];

  // For each resolver file, import the default export and add it to the 'resolvers' array.
  for (const resolver of resolverFiles) {
    const { default: resolverExport } = await import(
      `${directoryPath}/${resolver.name}`
    );
    resolvers.push(resolverExport);
  }

  // Merge the resolvers into a single object.

  const mergedResolvers = resolvers.reduce((acc, resolver) => {
    for (const key of Object.keys(resolver)) {
      if (!acc[key]) {
        acc[key] = {};
      }
      Object.assign(acc[key], resolver[key]);
    }
    return acc;
  }, {});
  // Return the merged resolvers.
  return mergedResolvers;
};

export const getSchema = async () => {
  // Define the path to the directory that contains the resolvers.
  const directoryPath = path.join(import.meta.dir, "../schema.graphql");

  return readFile(directoryPath, { encoding: "utf-8" });
};

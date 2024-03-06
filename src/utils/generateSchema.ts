import type { Dirent } from "node:fs";
import { readdir } from "node:fs/promises";
import path from "path";

const isSchema = (file: Dirent) => file.name.includes("schema");

// Define the path to the directory that contains the resolvers.
const directoryPath = path.join(import.meta.dir, "../app");

// Read all files in the directory.
// This is done recursively, so it includes files in subdirectories.
// The 'withFileTypes' option is set to 'true', so the returned array includes 'Dirent' objects instead of strings.
const files = await readdir(directoryPath, {
	recursive: true,
	withFileTypes: true,
});

// Filter the files to get only the schema.
const schemaFiles = files.filter((file) => isSchema(file));

// Define an array to hold the schemas.
const schemas = [];

for (const schemaFile of schemaFiles) {
	const { default: schemaExport } = await import(
		`${directoryPath}/${schemaFile.name}`
	);

	const schema = await Bun.file(schemaExport, { type: "graphql" }).text();

	schemas.push(schema);
}

// Return the merged schema.
const schema = schemas.join("");
const spacing = "\n\n  ";

// Match the contents of the Mutation types
const mutationMatches = schema.match(/type Mutation \{([^}]*)\}/gs);

// Extract the fields from the Mutation types and trim them
const mutationFields = mutationMatches?.map((match) =>
	match.replace(/type Mutation \{|\}/g, "").trim(),
);

// Match the contents of the Query types
const queryMatches = schema.match(/type Query \{([^}]*)\}/gs);

// Extract the fields from the Query types and trim them
const queryFields = queryMatches?.map((match) =>
	match.replace(/type Query \{|\}/g, "").trim(),
);

// Trim the fields to remove leading and trailing whitespace
const mutation = mutationFields?.join(spacing).trim();
const query = queryFields?.join(spacing).trim();
const rest = schema
	.replace(/type Mutation \{([^}]*)\}/gs, "")
	.replace(/type Query \{([^}]*)\}/gs, "")
	.trim();

// Combine the Mutation and Query types
const combinedSchema = `
type Mutation {
  ${mutation}
}

type Query {
  ${query}
}

${rest}
`.trim();

const outputPath = path.join(import.meta.dir, "../schema.graphql");

await Bun.write(outputPath, combinedSchema);

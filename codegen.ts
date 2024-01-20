import type { CodegenConfig } from "@graphql-codegen/cli";

const config: CodegenConfig = {
	overwrite: true,
	schema: "./src/schema.graphql",
	generates: {
		"src/generated/index.ts": {
			plugins: ["typescript", "typescript-resolvers"],
		},
	},
};

export default config;

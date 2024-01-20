declare module "bun" {
	interface Env {
		JWT_SECRET: string;
		SALT: string;
		DATABASE_URL: string;
	}
}

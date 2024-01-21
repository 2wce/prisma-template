declare module "bun" {
	interface Env {
		JWT_SECRET: string;
		SALT: string;
		DATABASE_URL: string;

		// Email config
		SMTP_HOST: string;
		SMTP_PORT: number;
		SMTP_USERNAME: string;
		SMTP_PASSWORD: string;
		NO_REPLY_EMAIL: string;

		PORT: number;
	}
}

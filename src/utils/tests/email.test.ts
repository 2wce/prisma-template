import { beforeEach, describe, expect, it } from "bun:test";
import { createTransport, type Transporter } from "nodemailer";
import type { SentMessageInfo } from "nodemailer/lib/smtp-transport";
import { sendEmail } from "../email";

// mock.module("nodemailer", jest.fn());

let transporter: Transporter<SentMessageInfo>;
describe.skip("sendEmail", () => {
	beforeEach(() => {
		// Reset the mock implementation before each test
		transporter = createTransport();
	});

	it("should send an email with the correct recipient, subject, and HTML content", async () => {
		const recipientEmail = "test@example.com";
		const html = "<p>This is the email content</p>";
		const subject = "Test Email";

		await sendEmail(recipientEmail, html, subject);

		expect(createTransport).toHaveBeenCalledTimes(1);
		expect(createTransport).toHaveBeenCalledWith({
			host: process.env.SMTP_HOST,
			port: process.env.SMTP_PORT,
			secure: true,
			auth: {
				user: process.env.SMTP_USERNAME,
				pass: process.env.SMTP_PASSWORD,
			},
		});

		expect(transporter.sendMail).toHaveBeenCalledTimes(1);
		expect(transporter.sendMail).toHaveBeenCalledWith({
			from: `Admin <${process.env.NO_REPLY_EMAIL}>`,
			to: recipientEmail,
			subject,
			html,
		});
	});

	it("should return the info about the sent email", async () => {
		const recipientEmail = "test@example.com";
		const html = "<p>This is the email content</p>";
		const subject = "Test Email";

		const info = await sendEmail(recipientEmail, html, subject);

		expect(info).toEqual(
			expect.objectContaining({ messageId: expect.any(String) }),
		);
	});

	it.skip("should handle errors and return the error object", async () => {
		const recipientEmail = "test@example.com";
		const html = "<p>This is the email content</p>";
		const subject = "Test Email";

		// createTransport.mockImplementationOnce(() => {
		// 	throw new Error("SMTP connection error");
		// });

		const error = await sendEmail(recipientEmail, html, subject);

		expect(createTransport).toHaveBeenCalledTimes(1);
		expect(error).toBeInstanceOf(Error);
		expect((error as Error).message).toBe("SMTP connection error");
	});
});

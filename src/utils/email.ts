import { createTransport } from "nodemailer";
import { formatError } from "./helper";

export const sendEmail = async (
	recipientEmail: string,
	html: string,
	subject: string,
) => {
	try {
		// create reusable transporter object using the default SMTP transport
		const transporter = createTransport({
			host: process.env.SMTP_HOST,
			port: process.env.SMTP_PORT,
			secure: true, // true for 465, false for other ports
			auth: {
				user: process.env.SMTP_USERNAME, // generated ethereal user
				pass: process.env.SMTP_PASSWORD, // generated ethereal password
			},
		});

		// send mail with defined transport object
		const info = await transporter.sendMail({
			from: `Admin <${process.env.NO_REPLY_EMAIL}>`, // sender address
			to: recipientEmail, // list of receivers
			subject, // Subject line
			html, // html body
		});

		console.log("Message sent:", info);

		return info;
	} catch (error) {
		formatError("sendEmail", error as Error);
		return error;
	}
};

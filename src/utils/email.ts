import { emailQueue } from "@/config/jobs";

export const sendEmail = async (
	recipientEmail: string,
	html: string,
	subject: string,
) => {
	emailQueue.add({ recipientEmail, html, subject });
};

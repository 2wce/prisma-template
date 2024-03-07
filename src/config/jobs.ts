import { mailers } from "@/config/mail";
import { formatError } from "@/utils";
import Queue from "bull";
import { createTransport } from "nodemailer";

// Create a new queue
export const emailQueue = new Queue("email");

// Process function for sending emails
emailQueue.process(async (job, done) => {
  try {
    const { recipientEmail, html, subject } = job.data;

    // create reusable transporter object using the default SMTP transport
    const transporter = createTransport(mailers.smtp);

    // send mail with defined transport object
    const info = await transporter.sendMail({
      from: `Admin <${process.env.NO_REPLY_EMAIL}>`, // sender address
      to: recipientEmail, // list of receivers
      subject, // Subject line
      html, // html body
    });

    console.log("Message sent:", info);

    done(null, info);
  } catch (error) {
    formatError("sendEmail", error as Error);
    done(error as Error);
  }
});

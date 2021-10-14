import { createTransport } from 'nodemailer'
import { formatError } from './helper'

export const sendEmail = async (
  recipientEmail: string,
  html: string,
  subject: string,
) => {
  try {
    // create reusable transporter object using the default SMTP transport
    let transporter = createTransport({
      host: 'email-smtp.eu-west-1.amazonaws.com',
      port: 587,
      secure: false, // true for 465, false for other ports
      auth: {
        user: process.env.SMTP_USERNAME, // generated ethereal user
        pass: process.env.SMTP_PASSWORD, // generated ethereal password
      },
    })

    // send mail with defined transport object
    let info = await transporter.sendMail({
      from: `Admin <${process.env.NO_REPLY_EMAIL}>`, // sender address
      to: recipientEmail, // list of receivers
      subject, // Subject line
      html, // html body
    })

    console.log('Message sent:', info)

    return info
  } catch (error) {
    formatError('sendEmail', error)
    return error
  }
}

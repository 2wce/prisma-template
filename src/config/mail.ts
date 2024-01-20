/*
|--------------------------------------------------------------------------
| Mailer Configurations
|--------------------------------------------------------------------------
|
| Here you may configure all of the mailers used by your application plus
| their respective settings. Several examples have been configured for
| you and you are free to add your own as your application requires.
|
| We support a variety of mail "transport" drivers to be used while
| sending an e-mail. You will specify which one you are using for your
| mailers below. You are free to add additional mailers as required.
|
| Supported: "smtp", "sendmail", "mailgun", "ses", "ses-v2",
|            "postmark", "log", "array", "failover", "roundrobin"
|
*/

export const mailers = {
  smtp: {
    host: process.env.SMTP_HOST,
    port: process.env.SMTP_PORT,
    secure: true, // true for 465, false for other ports
    auth: {
      user: process.env.SMTP_USERNAME, // generated ethereal user
      pass: process.env.SMTP_PASSWORD, // generated ethereal password
    },
  },
};

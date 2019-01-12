import * as nodemailer from 'nodemailer';
import * as mg from 'nodemailer-mailgun-transport';

const auth = {
  auth: {
    api_key: process.env.MAILGUN_ACTIVE_API_KEY,
    domain: process.env.MAILGUN_DOMAIN
  }
};

const emailSender = nodemailer.createTransport(mg(auth));

export async function sendEmail(item: {
  to: string;
  subject: string;
  text: string;
}) {
  return new Promise((resolve, reject) => {
    this.emailClient.sendMail(
      {
        from: process.env.SEND_EMAIL_FROM,
        to: item.to,
        subject: item.subject,
        text: item.text
      },
      (err: any, info: any) => {
        if (err) {
          reject(err);
        } else {
          resolve(info);
        }
      }
    );
  });
}

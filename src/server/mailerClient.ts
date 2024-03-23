import { env } from "~/env";
import nodemailer from 'nodemailer';

// import aws, { type SESClientConfig } from '@aws-sdk/client-ses';
// import { defaultProvider } from '@aws-sdk/credential-provider-node';
// const ses = new aws.SES({
// 	apiVersion: '2010-12-01',
// 	region: 'us-east-2',
// 	credentialDefaultProvider: defaultProvider
// });
// const transporter = nodemailer.createTransport({
// 	SES: { ses, aws }
// });

const transporter = nodemailer.createTransport({
  service: 'gmail', // use 'gmail' as the service
  auth: {
    user: env.EMAIL_SERVER_USER, // your Gmail account
    pass: env.EMAIL_SERVER_PASSWORD // your Gmail password
  }
});

export const sendMail = async (
  to: string | string[],
  subject: string,
  text: string,
  html: string
) => {
  await transporter.sendMail({
    from: env.EMAIL_FROM,
    to,
    subject,
    text,
    html
  });
};

export const sendEmailVerificationEmail = async (to: string, token: string) => {
  try {
    await sendMail(
      to,
      'Verify your account',
      `Your password verification code is here.`,
      `<b>Your reset password verification code is: ${token}</b>
			<br>
			<b>Alternatively, you can use the following link: <a href="${env.NEXTAUTH_URL}/callback/email?code=${token}">Click here to verify</a></b>
			<br>
			Or copy and paste this link into your browser:
			<a href="${env.NEXTAUTH_URL}/callback/email?code=${token}">${env.NEXTAUTH_URL}/callback/email?code=${token}</a>
			`
    );
  } catch (e) {
    console.log(e);
  }
};

export const sendEmailResetPassword = async (to: string, token: string) => {
  await sendMail(
    to,
    'Reset Your password',
    `Your reset password verification code is here.`,
    `<b>Your reset password verification code is: ${token}</b>
		<br>
		<b>Alternatively, you can use the following link: <a href="${env.NEXTAUTH_URL}/forgotPassword/reset?code=${token}">Click here to reset your password</a></b>
		<br>

		Or copy and paste this link into your browser:
		<a href="${env.NEXTAUTH_URL}/forgotPassword/reset?code=${token}">${env.NEXTAUTH_URL}/forgotPassword/reset?code=${token}</a>
		`
  );
};

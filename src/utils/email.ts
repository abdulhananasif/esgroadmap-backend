import axios from 'axios';

const API_KEY = process.env.BREVO_API_KEY;
const BREVO_EMAIL = process.env.BREVO_EMAIL;
const EMAIL_FROM_NAME = process.env.EMAIL_FROM_NAME;

export const sendEmail = async (
  recipient: string,
  subject: string,
  htmlContent: string
) => {
  try {
    const response = await axios.post(
      'https://api.brevo.com/v3/smtp/email',
      {
        sender: { name: EMAIL_FROM_NAME, email: BREVO_EMAIL },
        to: [{ email: recipient }],
        subject,
        htmlContent,
      },
      {
        headers: {
          'api-key': API_KEY,
          'Content-Type': 'application/json',
        },
      }
    );
  } catch (error: any) {
    throw new Error('Email sending failed');
  }
};
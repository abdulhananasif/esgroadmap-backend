import nodemailer from 'nodemailer';

const generateEmailHTMLContent = (content: string) => `
  <p>${content}</p>
`;

const generateMailOptions = (
  recipient: string,
  subject: string,
  content: string
) => ({
  from: process.env.EMAIL,
  to: recipient,
  subject: subject,
  html: generateEmailHTMLContent(content),
});

const generateTransporter = () =>
  nodemailer.createTransport({
    host: 'smtp.hostinger.com',
    port: 465,
    secure: true,
    auth: {
      user: process.env.EMAIL,
      pass: process.env.EMAIL_PASSWORD,
    },
  });

export const sendEmail = async (
  recipient: string,
  subject: string,
  content: string
) => {
  const transporter = generateTransporter();
  const mailOptions = generateMailOptions(recipient, subject, content);
  await transporter.sendMail(mailOptions);
};

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
{  
  console.log("🚀 ~ process.env.EMAIL_PASSWORD:", process.env.EMAIL_PASSWORD)
      console.log("🚀 ~ process.env.EMAIL:", process.env.EMAIL)
  return nodemailer.createTransport({
    host: 'esgroadmap.com',
    port: 465,
    secure: true,
    auth: {
      user: process.env.EMAIL,
      pass: process.env.EMAIL_PASSWORD,
    },
    
  })}
      

export const sendEmail = async (
  recipient: string,
  subject: string,
  content: string
) => {
  console.log("🚀 ~ recipient:", recipient)
  const transporter = generateTransporter();
  const mailOptions = generateMailOptions(recipient, subject, content);
  await transporter.sendMail(mailOptions);
};

import nodemailer from 'nodemailer';
const generateEmailHTMLContent = (content) => `
  <p>${content}</p>
`;
const generateMailOptions = (recipient, subject, content) => ({
    from: process.env.EMAIL,
    to: recipient,
    subject: subject,
    html: generateEmailHTMLContent(content),
});
const generateTransporter = () => nodemailer.createTransport({
    host: 'esgroadmap.com',
    port: 465,
    secure: true,
    auth: {
        user: process.env.EMAIL,
        pass: process.env.EMAIL_PASSWORD,
    },
});
export const sendEmail = async (recipient, subject, content) => {
    const transporter = generateTransporter();
    const mailOptions = generateMailOptions(recipient, subject, content);
    await transporter.sendMail(mailOptions);
};

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
const generateTransporter = () => {
    return nodemailer.createTransport({
        host: 'esgroadmap.com',
        port: 465,
        secure: true,
        auth: {
            user: process.env.EMAIL,
            pass: process.env.EMAIL_PASSWORD,
        },
    });
};
export const sendEmail = async (recipient, subject, content) => {
    console.log("🚀 ~ recipient:", recipient);
    const transporter = generateTransporter();
    const mailOptions = generateMailOptions(recipient, subject, content);
    await transporter.sendMail(mailOptions);
};

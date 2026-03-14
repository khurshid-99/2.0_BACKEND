import "dotenv/config";
import nodemailer from "nodemailer";

const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    type: "OAuth2",
    user: process.env.GOOGULE_USER,
    clientId: process.env.GOOGLE_CLIENT_ID,
    clientSecret: process.env.GOOGLE_CLIENT_SECRET,
    refreshToken: process.env.GOOGLE_REFRESH_TOKEN,
  },
});

transporter
  .verify()
  .then(() => {
    console.log("Email transporter is ready to send email");
  })
  .catch((error) => {
    console.log(`Error setting up email transporter : ${error} `);
  });

export async function sendEmail({ to, subject, html, text }) {
  from: process.env.GOOGULE_USER;
  const mailOption = {
    to,
    subject,
    html,
    text,
  };

  const details = await transporter.sendMail(mailOption);
  console.log(`Email send : ${details}`);

  return `Email send successfully to : ${to}`
}

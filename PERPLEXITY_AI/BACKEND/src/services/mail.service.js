import "dotenv/config";
import nodeMailer from "nodemailer";

const transporter = nodeMailer.createTransport({
  service: "gmail",
  auth: {
    type: "OAuth2",
    user: process.env.GOOGULE_USER,
    clientSecret: process.env.GOOGLE_CLIENT_SECRET,
    refreshToken: process.env.GOOGLE_REFRESH_TOKEN,
    clientId: process.env.GOOGLE_CLIENT_ID,
  },
});

transporter
  .verify()
  .then(() => {
    console.log(`Email transpoter is ready to send email`);
  })
  .catch((err) => {
    console.log(`Error setting up email transporter: ${err}`);
  });

export async function sendEmail({ to, subject, html, text }) {

  const mailOptions = {
    from: process.env.GOOGULE_USER,
    to,
    subject,
    html,
    text,
  };
  const details = await transporter.sendMail(mailOptions);
  console.log(`Email send ${details}`);
}

import nodemailer from "nodemailer"

export const transporter = nodemailer.createTransport({
  host: process.env.MAILTRAP_HOST,
  port: Number(process.env.MAILTRAP_PORT),
  secure: false, // must be false for 2525 or 587
  auth: {
    user: process.env.MAILTRAP_USER,
    pass: process.env.MAILTRAP_PASS,
  },
  connectionTimeout: 5000, // prevents hanging requests
});

// Verify SMTP connection when server starts
transporter.verify((error, success) => {
  if (error) {
    console.log("SMTP Connection Error:");
    console.log(error);
  } else {
    console.log("Mailtrap SMTP is ready to send emails");
  }
})
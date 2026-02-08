const nodemailer = require("nodemailer");


const transporter = nodemailer.createTransport({
  host: process.env.SMTP_HOST,
  port: parseInt(process.env.SMTP_PORT),
  secure: process.env.SMTP_PORT == "465", // true only if 465
  auth: {
    user: process.env.SMTP_USER,
    pass: process.env.SMTP_PASS,
  },
});


transporter.verify((error, success) => {
    if (error) {
        console.log(process.env.SMTP_HOST, process.env.SMTP_PORT);
        console.log("❌ SMTP Error:", error.message);
    } else {
        console.log("✅ SMTP Server is ready to send emails");
    }
});

module.exports = transporter;

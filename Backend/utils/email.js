const nodemailer = require("nodemailer");

const sendEmail = (options) => {
  // 1) Create transporter
  const transporter = nodemailer.createTransport({
    service: "Gmail",
    auth: {
      user: process.env.EMAIL_USERNAME,
      pass: process.env.EMAIL_PASSWORD,
    },
  });
};

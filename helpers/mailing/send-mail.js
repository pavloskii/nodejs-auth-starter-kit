"use strict";
require("dotenv").config();
const nodemailer = require("nodemailer");
module.exports = sendMail;

async function sendMail(to, subject, text, html) {
  let transporter = nodemailer.createTransport({
    host: "smtp.gmail.com",
    port: 465,
    secure: true,
    auth: {
      user: process.env.MAIL_USER,
      pass: process.env.MAIL_PASSWORD
    }
  });

  transporter.sendMail({
    from: process.env.MAIL_COMPANY,
    to,
    subject,
    text,
    html
  });
}

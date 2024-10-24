const nodemailer = require("nodemailer");

const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASS,
  },
});

exports.sendEmail = async (to, subject, text) => {
  try {
    const mailOptions = {
      from: process.env.EMAIL_USER,
      to: to,
      subject: subject,
      text: text,
    };
    if (!process.env.EMAIL_USER) {
      return transporter.sendMail(mailOptions);
    } else {
      console.log("Please Add Username And Password");
      return;
    }
  } catch (error) {
    console.log(error);
  }
};

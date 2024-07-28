const nodemailer = require("nodemailer");

const sendMail = async (user) => {
  const transporter = nodemailer.createTransport({
    port: "8000",
    service: "gmail",
    auth: {
      user: process.env.SMTP_EMAIL,
      pass: process.env.SMTP_PASSWORD,
    },
  });

  const message = {
    from: `Notes App < ${process.env.SMTP_EMAIL} >`,
    to: user.email,
    subject: "Password Reset Request",
    text: `We've received a request to reset your password. If you didn't make this request, then please ignore this notification.\n\nOtherwise, you can reset your password using this link:\nhttp://localhost:5173/resetPassword/${user.resetPasswordToken}`,
  };

  transporter.sendMail(message);
};

module.exports = { sendMail };

const nodemailer = require("nodemailer");

const transporter = nodemailer.createTransport({
  service: "gmail",
  host: "smtp.gmail.com",
  port: 465,
  secure: true,
  auth: {
    user: process.env.MAIL_USER,
    pass: process.env.MAIL_PASSWORD,
  },
});

const sendConfirmationEmail = (name, email, confirmationCode) => {
  const mailOptions = {
    from: process.env.MAIL_USER,
    to: email,
    subject: "Please confirm your account",
    html: `<h1>Email Confirmation</h1>
        <h2>Hello ${name}</h2>
        <p>Thank you for subscribing. Please confirm your email by clicking on the following link</p>
        <a href=http://localhost:3000/authentication/confirm/${confirmationCode}> Click here</a>
        </div>`,
  };
  transporter.sendMail(mailOptions).catch((err) => console.log(err));
};

module.exports = {
  sendConfirmationEmail,
  transporter,
};

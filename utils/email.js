const nodemailer = require('nodemailer');

const sendEmail = async (options) => {
  try {
    //* CREATE A TRANSPORTER
    let transporter = nodemailer.createTransport({
      host: process.env.EMAIL_HOST,
      port: process.env.EMAIL_PORT,
      auth: {
        user: process.env.EMAIL_USERNAME,
        pass: process.env.EMAIL_PASSWORD,
      },
    });
    //* DEFINE THE EMAIL OPTIONS
    const mailOptions = {
      from: 'Kenechukwu Agagwu <keneagagwuu@gmail.com>',
      to: options.email,
      subject: options.subject,
      text: options.message,
    };
    //* SEND THE EMAIL
    transporter = await transporter.sendMail(mailOptions);
    return transporter;
  } catch (err) {
    console.log(err);
  }
};

module.exports = sendEmail;

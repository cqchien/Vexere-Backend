const nodemailer = require("nodemailer");
const transport = (user, pass) => {
  return {
    host: "smtp.gmail.com",
    port: 587,
    secure: false,
    requireTLS: true,
    requireSSl: true,
    auth: {
      user: `${user}`,
      pass: `${pass}`
    }
  };
};
const mailOption = () => {
  return {
    from: "noreply@gmail.com",
    to: "18520526@gm.uit.edu.vn",
    subject: "Mail Xác Nhận Mua Vé Thành Công",
    html: `Cảm ơn bạn đã mua vé của chúng tôi. \nChúc quý khách có 1 chuyến đi vui vẻ`
  };
};
module.exports.sendEmail = () => {
  const transport = {
    host: "smtp.gmail.com",
    port: 587,
    secure: false,
    requireTLS: true,
    requireSSl: true,
    auth: {
      user: "caochientp1@gmail.com",
      pass: "chiengu0"
    }
  };
  const transporter = nodemailer.createTransport(transport);
  const mailOption = {
    from: "noreply@gmail.com",
    to: "18520526@gm.uit.edu.vn",
    subject: "Mail Xác Nhận Mua Vé Thành Công",
    html: `Cảm ơn bạn đã mua vé của chúng tôi. \nChúc quý khách có 1 chuyến đi vui vẻ`
  };

  transporter.sendMail(mailOption, (err) => {
    if (err) {
      return res.status(400).json(err);
    }
    return res.status(200).json({ message: "Send Email Successfully" });
  });
};

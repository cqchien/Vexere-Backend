const nodemailer = require("nodemailer");
const fs = require("fs");
const hogan = require("hogan.js");
const { email, password } = require("../../config/index");

const template = fs.readFileSync(`${__dirname}/bookTicket.hjs`, "utf-8");
const compiledTemplate = hogan.compile(template);

// const transport = (user, pass) => {
//   return {
//     host: "smtp.gmail.com",
//     port: 587,
//     secure: false,
//     requireTLS: true,
//     requireSSl: true,
//     auth: {
//       user: `${user}`,
//       pass: `${pass}`
//     }
//   };
// };
// const mailOption = () => {
//   return {
//     from: "noreply@gmail.com",
//     to: "18520526@gm.uit.edu.vn",
//     subject: "Mail Xác Nhận Mua Vé Thành Công",
//     html: `Cảm ơn bạn đã mua vé của chúng tôi. \nChúc quý khách có 1 chuyến đi vui vẻ`
//   };
// };
module.exports.sendEmail = (trip, user, ticket) => {
  const transport = {
    host: "smtp.gmail.com",
    port: 587,
    secure: false,
    requireTLS: true,
    requireSSl: true,
    auth: {
      user: `${email}`,
      pass: `${password}`,
    }
  };
  const transporter = nodemailer.createTransport(transport);
  const mailOption = {
    from: `${email}`,
    to: "18520526@gm.uit.edu.vn",
    subject: "Mail Xác Nhận Mua Vé Thành Công",
    html: compiledTemplate.render({
      email: user.Email,
      fromStation: trip.fromStation.name,
      toStation: trip.toStation.name,
      price: trip.price,
      amount: ticket.seats.length,
      total: ticket.totalPrice,
      seatCodes: ticket.seats.map((s) => s.code).join("-")
    })
  };

  transporter.sendMail(mailOption, (err) => {
    if (err) {
      return res.status(400).json(err);
    }
    return res.status(200).json({ message: "Send Email Successfully" });
  });
};

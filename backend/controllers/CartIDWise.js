const UserOrder = require("../models/userOrder");
const itemModel = require("../models/items");
// const nodemailer = require("nodemailer");
// let transporter = nodemailer.createTransport({ //haven't setup nodemailer yet, it's like an auto mailing system
//   service: "gmail",
//   auth: {
//     type: "OAuth2",
//     user: process.env.MAIL_USERNAME,
//     pass: process.env.MAIL_PASSWORD,
//     clientId: process.env.OAUTH_CLIENTID,
//     clientSecret: process.env.OAUTH_CLIENT_SECRET,
//     refreshToken: process.env.REFRESH_TOKEN,
//   },
// });
async function PlaceOrder(req, res) {
  const id = req?.params?.id;
  const { item, quantity, mail } = req?.body;
  if (!id) return res.status(400).json({ Alert: "No ID received" });

  try {
    const itemExists = await itemModel.findOne({ itemName: item });
    const enoughSupply = await itemModel.findOne({
      itemName: item,
      itemQuantity: { $gte: quantity },
    });

    if (!itemExists || !enoughSupply) {
      return res
        .status(400)
        .json({ Alert: "Item unavailable or not enough stock remaining!" });
    } else {
      await itemModel.updateOne(
        { itemName: item },
        { $inc: { itemQuantity: -quantity } }
      );

      const userOrder = new UserOrder({
        orderedItem: item,
        orderedQuantity: quantity,
      });

      await userOrder.save();

      //   const transport = nodemailer.createTransport({
      //     host: "smtp.mailtrap.io",
      //     port: 2525,
      //     auth: {
      //       user: "veloxalfrfr",
      //       pass: "velobaka123",
      //     },
      //   });

      //   const mailOptions = {
      //     from: '"Team VeloFlix" <from@imveloxal@gmail.com>',
      //     to: mail,
      //     subject: "Order Placed",
      //     text: `Dear user, your order for ${quantity} ${item}(s) has been placed. Thank you!`,
      //   };

      await transport.sendMail(mailOptions);

      return res.status(200).json({ Alert: "Order Placed" });
    }
  } catch (error) {
    console.error(error);
    return res.status(500).json({ Alert: "Internal Server Error" });
  }
}

module.exports = { PlaceOrder };

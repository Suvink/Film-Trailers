const express = require("express");
const router = express.Router();
const itemModel = require("../models/items");
const UserOrder = require("../models/userOrder");
const nodemailer = require("nodemailer");
let transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    type: "OAuth2",
    user: process.env.MAIL_USERNAME,
    pass: process.env.MAIL_PASSWORD,
    clientId: process.env.OAUTH_CLIENTID,
    clientSecret: process.env.OAUTH_CLIENT_SECRET,
    refreshToken: process.env.REFRESH_TOKEN,
  },
});

router
  .route("/")
  .get(async (req, res) => {
    const data = await itemModel.find();
    res.json(data).status(200);
  })
  .post(async (req, res) => {
    const { item, description, quantity, image } = req?.body;

    if (!item || !description || !quantity)
      return res
        .status(400)
        .json({ Alert: "No Item name/description or quantity given" });

    const verifyItem = await itemModel.findOne({ itemName: item });
    if (!verifyItem) {
      const newItem = new itemModel({
        itemName: item,
        itemDescription: description,
        itemQuantity: quantity,
        itemPhoto: image,
        itemAvailability: true,
      });

      await newItem.save();
      return res.status(201).json({ Alert: `Item ${item} saved` });
    } else {
      return res.status(409).json({ Alert: `Item ${item} already exists` });
    }
  });

router.route("/:id").post(async (req, res) => {
  const { id } = req?.params;
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

      const transport = nodemailer.createTransport({
        host: "smtp.mailtrap.io",
        port: 2525,
        auth: {
          user: "veloxalfrfr",
          pass: "velobaka123",
        },
      });

      const mailOptions = {
        from: '"Team VeloFlix" <from@imveloxal@gmail.com>',
        to: mail,
        subject: "Order Placed",
        text: `Dear user, your order for ${quantity} ${item}(s) has been placed. Thank you!`,
      };

      await transport.sendMail(mailOptions);

      return res.status(200).json({ Alert: "Order Placed" });
    }
  } catch (error) {
    console.error(error);
    return res.status(500).json({ Alert: "Internal Server Error" });
  }
});

module.exports = router;

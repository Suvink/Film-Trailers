const itemModel = require("../models/items");
const Stripe = require("stripe");
const stripe = Stripe("sk_test_4eC39HqLyjWDarjtT1zdp7dc");

async function GetCart(req, res) {
  try {
    const data = await itemModel.find().sort("createdAt");
    res.status(200).json(data);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal Server Error" });
  }
}

async function CreateItem(req, res) {
  try {
    const { item, description, quantity, image } = req?.body;

    if (!item || !description || !quantity) {
      return res
        .status(400)
        .json({ Alert: "No Item name/description or quantity given" });
    }

    const verifyItem = await itemModel.findOne({ itemName: item });

    if (!verifyItem) {
      const customer = await stripe.customers.create({
        description: "My First Test Customer",
      });

      // var charge = await stripe.charges.retrieve("ch_3LiiC52eZvKYlo2C1da66ZSQ", {
      //   apiKey: "sk_test_51NpbrcSC1RFd3OpqyZz70aiMZJSiHhVaHirssQaWYfjTiASB44Mm8skq9gbZrIZAfKFBR3FnbNAiZwKqaPM7WxRn00cBKwV9AK",
      // });

      const newItem = new itemModel({
        itemName: item,
        itemDescription: description,
        itemQuantity: quantity,
        itemPhoto: image,
        itemAvailability: true,
        payment: customer,
      });

      await newItem.save();
      return res.status(201).json({ Alert: `Item ${item} saved` });
    } else {
      return res.status(409).json({ Alert: `Item ${item} already exists` });
    }
  } catch (err) {
    console.error(err);
    return res.status(500).json({ Alert: "Internal Server Error" });
  }
}

module.exports = { GetCart, CreateItem };

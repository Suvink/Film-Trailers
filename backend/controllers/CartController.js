const itemModel = require("../models/items");

async function GetCart(req, res) {
  const data = await itemModel.find();
  res.json(data).status(200);
}

async function CreateItem(req, res) {
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
}

module.exports = { GetCart, CreateItem };

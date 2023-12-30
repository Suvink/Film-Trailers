const multer = require("multer");
const mediaModel = require("../models/media");
const { ObjectId } = require("mongodb");
require("dotenv").config();
const pipeline = [];

const storage = multer.memoryStorage();
const upload = multer({ storage });

async function SearchByTitle(req, res) {
  // const { limit } = req?.body;
  // const limiter = { $limit: limit };
  // pipeline.push(limiter);

  const { title } = req?.params;
  if (!title) return res.status(400).json({ Alert: "Title not found" });

  try {
    const titleToString = String(title);
    const matches = await mediaModel.aggregate([
      {
        $match: {
          title: { $regex: titleToString, $options: "i" },
        },
      },
      ...pipeline,
    ]);

    if (matches.length === 0) {
      return res.status(404).json({ Alert: "No matching films found" });
    } else {
      res.status(200).json(matches);
    }
  } catch (error) {
    console.error("Error searching by title:", error);
    res.status(500).json({ Alert: "Internal Server Error" });
  }
}

async function DeleteItems(req, res) {
  const { id } = req?.params;
  const convertedString = String(id);
  const filmExists = await mediaModel.findOne({ _id: convertedString });
  if (!filmExists) {
    return res.status(404).json({ Alert: "Film doesn't exist" });
  } else {
    await mediaModel.deleteOne({ _id: id });
    return res.status(200).json({ Alert: "Film Deleted" });
  }
}

async function UpdateFilm(req, res) {
  const { id } = req?.params;
  const { title } = req.body;
  const convertedString = String(id);
  const filmExists = await mediaModel.findOne({
    _id: new ObjectId(convertedString),
  });
  if (!filmExists) {
    return res.status(404).json({ Alert: "Film doesn't exist" });
  } else {
    await mediaModel.findOneAndUpdate({ title: title });
    return res.status(200).json({ Alert: "Film Updated" });
  }
}

module.exports = { SearchByTitle, DeleteItems, UpdateFilm };

const multer = require("multer");
const sharp = require("sharp");
const { join } = require("path");
const mediaModel = require("../models/media");
require("dotenv").config();

const storage = multer.memoryStorage();
const upload = multer({ storage });

async function SearchByTitle(req, res) {
  const { title } = req?.params;
  if (!title) return res.status(400).json({ Alert: "Title not found" });

  try {
    const titleToString = String(title);
    const matches = await mediaModel.find({
      title: { $regex: titleToString, $options: "i" },
    });

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
  const filmExists = await mediaModel.findOne({ _id: convertedString });
  if (!filmExists) {
    return res.status(404).json({ Alert: "Film doesn't exist" });
  } else {
    await mediaModel.findOneAndUpdate({ title: title });
    return res.status(200).json({ Alert: "Film Updated" });
  }
}

module.exports = { SearchByTitle, DeleteItems, UpdateFilm };

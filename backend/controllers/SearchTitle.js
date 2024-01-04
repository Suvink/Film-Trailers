const multer = require("multer");
const mediaModel = require("../models/media");
const { ObjectId } = require("mongodb");
require("dotenv").config();

const storage = multer.memoryStorage();
const upload = multer({ storage });

async function IDWise(req, res) {
  const { id } = req?.params;
  if (!id) return res.status(400).json({ Alert: "No ID Provided" });

  const foundByID = await mediaModel.findOne({ _id: String(id) });

  if (!foundByID) {
    return res.status(404).json({ Alert: "Film doesn't exist" });
  } else {
    return res.status(200).json(foundByID);
  }
}

async function SearchByTitle(req, res) {
  // const { limit } = req?.body;
  // const limiter = { $limit: limit };
  // pipeline.push(limiter);

  const { title, id } = req?.params;
  if (!title || !id) return res.status(400).json({ Alert: "Title not found" });

  try {
    const titleToString = String(title);
    const titleToID = String(id);
    const matches = await mediaModel.find({
      $or: { title: titleToString, _id: titleToID },
    });

    if (matches.length || !id === 0) {
      return res
        .status(404)
        .json({ Alert: "No matching films found or ID matches" });
    } else {
      res.status(200).json(matches);
    }
  } catch (error) {
    console.error("Error searching by title:", error);
    res.status(500).json({ Alert: "Internal Server Error" });
  }
}

async function DeleteItems(req, res) {
  try {
    const { id } = req?.params;
    const convertedString = String(id);
    const filmExists = await mediaModel.findOne({ _id: convertedString });
    if (!filmExists) {
      return res.status(404).json({ Alert: "Film doesn't exist" });
    } else {
      await mediaModel.deleteOne({ _id: id });
      return res.status(200).json({ Alert: "Film Deleted" });
    }
  } catch (err) {
    console.error(err);
  }
}

async function UpdateFilm(req, res) {
  try {
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
  } catch (err) {
    console.error(err);
  }
}

module.exports = { SearchByTitle, DeleteItems, UpdateFilm, IDWise };

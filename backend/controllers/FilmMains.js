const mediaModel = require("../models/media");
const cloudinary = require("cloudinary").v2;
require("dotenv").config();

async function GetFilms(req, res) {
  try {
    const videos = await mediaModel.find().sort("createdAt");
    res.json(videos);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal Server Error" });
  }
}

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_CLOUD_KEY,
  api_secret: process.env.CLOUDINARY_CLOUD_SECRET,
});

async function CreateFilms(req, res) {
  try {
    const { title, description, trailer, photo, alternate, rating } = req?.body;

    if (!title || !trailer) {
      return res.status(400).json({ alert: "Title or trailer missing" });
    }

    // let photoURL;
    // try {
    //   // photoURL = await cloudinary.uploader.upload(photo);
    // } catch (uploadError) {
    //   console.error(uploadError);
    //   return res
    //     .status(500)
    //     .json({ error: "Error uploading photo to Cloudinary" });
    // }

    const filmExists = await mediaModel.findOne({ title: title });

    if (!filmExists) {
      const newMovie = new mediaModel({
        title,
        description,
        trailer,
        // photo: photoURL.url,
        alternate,
        rating,
      });

      await newMovie.save();
      return res.status(201).json({ alert: `${title} saved` });
    } else {
      return res.status(409).json({ alert: `${title} already exists` });
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal Server Error" });
  }
}

module.exports = { GetFilms, CreateFilms };

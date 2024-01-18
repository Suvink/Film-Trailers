const mediaModel = require("../models/media");
const cloudinary = require("cloudinary").v2;
require("dotenv").config();

async function GetFilms(req, res) {
  console.log(req.session);
  console.log(req.headers.sesion);
  try {
    const videos = await mediaModel.find();
    res.status(200).json(videos);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal Server Error" });
  }
}

cloudinary.config({
  cloud_name: "dsto9mmt0",
  api_key: "857482966483428",
  api_secret: "Vry5wv5flNncSsA3t6km4SQcGnM",
  secure: true,
});

async function CreateFilms(req, res) {
  try {
    const { title, description, trailer, photo, alternate, rating } = req?.body;

    if (!title || !trailer) {
      return res.status(400).json({ alert: "Title or trailer missing" });
    }

    // let photoURL;
    // try {
    //   photoURL = await cloudinary.uploader.upload(photo);
    // } catch (uploadError) {
    //   console.error(uploadError);
    //   return res
    //     .status(500)
    //     .json({ error: "Error uploading photo to Cloudinary" });
    // }

    const filmExists = await mediaModel.findOne({ title: title });

    if (!filmExists) {
      await mediaModel.create({
        title,
        description,
        trailer,
        // photo: photoURL.url,
        alternate,
        rating,
      });

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

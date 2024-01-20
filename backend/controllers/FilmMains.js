const mediaModel = require("../models/media");
const cloudinary = require("cloudinary").v2;
require("dotenv").config();

async function GetFilms(req, res) {
  const id = req?.params?.id; //thinking of possibly connecting two routes to the same function!
  if (!id) {
    try {
      const videos = await mediaModel.find(); //if no such id is given then do this!
      res.status(200).json(videos);
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: "Internal Server Error" }); // Let's move the error codes to an enum
    }
  } else {
    const found = await mediaModel.findOne({ _id: String(id) }); //if id is given!
    if (!found) {
      return res.status(400).json({ Alert: "Invalid ID" });
    } else {
      return res.status(200).json(found);
    }
  }
}

cloudinary.config({
  cloud_name: "dsto9mmt0",
  api_key: "857482966483428",
  api_secret: "Vry5wv5flNncSsA3t6km4SQcGnM", // Let's move these secrets to an env variable
  secure: true,
});

async function CreateFilms(req, res) {
  try {
    const { title, description, trailer, photo, alternate, rating } =
      req?.body?.data;

    // Check if required fields are missing
    if (!title || !trailer) {
      return res.status(400).json({ error: "Title or trailer missing" });
    }

    // Upload photo to Cloudinary
    let photoURL;
    try {
      photoURL = await uploadToCloudinary(photo);
    } catch (uploadError) {
      console.error(uploadError);
      return res
        .status(500)
        .json({ error: "Error uploading photo to Cloudinary" });
    }

    // Check if the film already exists
    const filmExists = await mediaModel.findOne({ title: title });

    // You need a rollback mechanism here. Youre checking if the film exists after uploading the photo to cloudinary.
    // What if the film exists but the photo is already uploaded? You'll have to delete the photo from cloudinary.
    // Maybe first check the film exists, then upload the photo to cloudinary, then create the film.

    if (!filmExists) {
      // Create and save the film
      await mediaModel.create({
        title,
        description,
        trailer,
        photo: photoURL.url,
        alternate,
        rating,
      });

      return res.status(201).json({ success: `${title} saved` });
    } else {
      // Film already exists
      return res.status(409).json({ error: `${title} already exists` });
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal Server Error" });
  }
}

// Function to upload photo to Cloudinary
async function uploadToCloudinary(photo) {
  return await cloudinary.uploader.upload(photo);
}

module.exports = { GetFilms, CreateFilms };

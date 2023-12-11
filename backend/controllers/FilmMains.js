const multer = require("multer");
const sharp = require("sharp");
const { join } = require("path");
const mediaModel = require("../models/media");
require("dotenv").config();

const storage = multer.diskStorage({
  destination: "./public/images",
  filename: function (req, file, cb) {
    cb(null, Date.now() + "-" + file.originalname);
  },
});

const upload = multer({ storage: storage }).array("file");

async function GetFilms(req, res) {
  try {
    const videos = await mediaModel.find();
    res.json(videos);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal Server Error" });
  }
}

async function CreateFilms(req, res) {
  try {
    const { title, description, trailer, photo, alternate } = req.body;
    if (!title || !trailer) {
      return res.status(400).json({ alert: "Title or trailer missing" });
    }

    const filmExists = await mediaModel.findOne({ title: title });

    let photofilename = req.body.photo;
    if (req.file) {
      upload(req, res, function (err) {
        if (err instanceof multer.MulterError) {
          return res.status(500).json(err);
        } else if (err) {
          return res.status(500).json(err);
        }
      });

      photofilename = `${Date.now()}.jpeg`;

      const filePath = join(__dirname, "public/filmimages", photofilename);

      console.log("File Path:", filePath);

      await sharp(req.file.buffer)
        .resize(480, 360)
        .jpeg({ mozjpeg: true, quality: 60 })
        .toFile(filePath);
    }

    if (!filmExists) {
      const newMovie = new mediaModel({
        title,
        description,
        trailer,
        photo: photofilename,
        alternate,
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

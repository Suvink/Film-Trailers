const sharp = require("sharp");
const { join } = require("path");
const multer = require("multer");

const storage = multer.diskStorage({
  destination: "./public/images",
  filename: function (req, file, cb) {
    cb(null, Date.now() + "-" + file.originalname);
  },
});

const upload = multer({ storage: storage }).array("file");

class Photo {
  async snapshot(photo) {
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
  }
}

module.exports = Photo;

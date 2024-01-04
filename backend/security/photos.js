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
  async snapshot(photo) {}
}

module.exports = Photo;

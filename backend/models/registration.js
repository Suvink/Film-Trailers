const mongoose = require("mongoose");
const userSchema = new mongoose.Schema(
  {
    username: {
      type: String,
      required: true,
      trim: true,
      min: 5,
      default: "",
    },
    password: {
      type: String,
      required: true,
      unique: true,
      trim: true,
      min: 5,
      default: "",
    },
    mail: {
      type: String,
      required: true,
      trim: true,
      min: 5,
      default: "",
    },
    photo: {
      type: String,
      default: "",
    },
  },
  { timestamps: true }
);

const movieModel = mongoose.model("users", userSchema);
module.exports = movieModel;

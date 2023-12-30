const mongoose = require("mongoose");
const userSchema = new mongoose.Schema(
  {
    username: {
      type: String,
      required: true,
      trim: true,
      min: 5,
      default: "guest",
    },
    password: {
      type: String,
      required: true,
      trim: true,
      min: 5,
      default: "guest123",
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

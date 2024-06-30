const mongoose = require("mongoose");

const userModel = mongoose.Schema(
  {
    username: {
      type: String,
      trim: true,
      minLength: 3,
      maxLenght: 20,
      required: true,
    },
    name: {
      type: String,
      required: true,
      trim: true,
    },
    profilepicture: {
      type: String,
      trim: true,
    },
    email: {
      type: String,
      required: true,
      select: false,
    },
    passwords: {
      typeof: String,
      required: true,
      select: false,
    },
    hisaab: [{ type: mongoose.Schema.Types.ObjectId, ref: "Hisaab" }],
  },
  { timestamp: true }
);

module.exports = mongoose.model('User',userModel);
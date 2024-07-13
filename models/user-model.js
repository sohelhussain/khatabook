const mongoose = require("mongoose");

const userModel = mongoose.Schema({
  username: {
    type: String,
    trim: true,
    required: true,
    minLength: 3,
    maxLength: 20,
  },
  name: {
    type: String,
    required: true,
    trim: true,
  },
  dp: {
    type: String,
    trim: true,
    default: "default.jpg",
  },
  email: {
    type: String,
    required: true,
    trim: true,
  },
  password: {
    type: String,
    required: true,
  },
  hisaab: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "hisaab",
    },
  ],
},
{timestamps: true}
);

module.exports = mongoose.model("user", userModel);
const jwt = require("jsonwebtoken");
const userModel = require("../models/user-model");

module.exports.isLoggedIn = async (req, res, next) => {
  try {
    if (req.cookies.token === "") {
      res.redirect("/");
    } else {
      const data = jwt.verify(req.cookies.token, process.env.JWT_SECRET_KEY);
      const oldUser = await userModel
        .findOne({ _id: data.id })
        .select("-password");
      if (oldUser) {
        req.user = oldUser;
      }
    }
  } catch (err) {
    res.redirect("/");
  }
  next();
};
module.exports.redirectToProfile = async (req, res, next) => {
  try {
    if (req.cookies.token) {
      res.redirect("/profile");
    } else {
      res.redirect("/");
    }
  } catch (err) {
    res.send(err.message);
  }
  next();
};

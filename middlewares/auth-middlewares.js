const jwt = require("jsonwebtoken");
const userModel = require("../models/user-model");

module.exports.isLoggedIn = async (req, res, next) => {
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
  next();
};
module.exports.redirectToProfile = async (req, res, next) => {
  let {token} = req.cookies;
  try{
    if (token) {
      jwt.verify(token, process.env.JWT_SECRET_KEY);
      res.redirect("/profile");
    }else{
      return next();
    }
  }catch(err){
    req.flash("error", err.message);
    res.redirect("/");
  }
};

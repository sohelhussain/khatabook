const userModel = require("../models/user-model");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

module.exports.landingPageController = (req, res) => {
  try {
    res.render("index");
  } catch (err) {
    res.send(err.message);
  }
};

module.exports.registerPageController = (req, res) => {
  try {
    res.render("register", { error: true });
  } catch (err) {
    res.send(err.message);
  }
};

module.exports.postRegisterPageController = async (req, res) => {
  try {
    let { name, username, email, password } = req.body;
    let user = await userModel.findOne({ email });
    if (user) return res.send("you are already registered please login");

    let salt = await bcrypt.genSalt(10);
    let hash = await bcrypt.hash(password, salt);

    let newUser = await userModel.create({
      email,
      name,
      username,
      password: hash,
    });

    let token = jwt.sign(
      { id: newUser._id, email: newUser.email },
      process.env.JWT_SECRET_KEY
    );
    res.cookie("token", token);
    res.send("account created successfully");
  } catch (err) {
    res.send(err.message);
  }
};

module.exports.postLoginController = async (req, res) => {
  try {
    let { emailorusername, password } = req.body;
    let user = await userModel
      .findOne({ email: emailorusername })
      .select("+password");
    if (!user)
      return res.send("you are not registered || please create a new account");
    let result = await bcrypt.compare(password, user.password);
    if (result) {
      let token = jwt.sign(
        { id: user._id, email: user.email },
        process.env.JWT_SECRET_KEY
      );
      res.cookie("token", token);
      res.send("account login successfully");
    } else {
      res.redirect("/register");
    }
  } catch (err) {
    res.send(err.message);
  }
};

// logout user

module.exports.logoutController = async (req, res) => {
  try {
    res.cookie("token", "");
    res.redirect("/");
  } catch (err) {
    res.send(err.message);
  }
};

// profile user

module.exports.profileController = async (req, res) => {
  try {
    res.render("profile", { user: req.user });
  } catch (err) {
    res.send(err.message);
  }
};

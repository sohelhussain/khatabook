const userModel = require("../models/user-model");
const hisabModel = require("../models/hisab-model");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

module.exports.landingPageController = (req, res) => {
    res.render("index", {nav: false, error: false});
};

module.exports.registerPageController = (req, res) => {
    res.render("register", { error: true, nav: false });
};

module.exports.postRegisterPageController = async (req, res) => {
    let { name, username, email, password } = req.body;
    if(!name || !username || !password || !email){
      req.flash('error', 'All fields are required');
      return res.redirect('/register');
    }
    let emailUser = await userModel.findOne({ email });
    if (emailUser){
       req.flash("error", "please login again onther account, or try to login");
      return res.redirect('/register');
    } 
    let usernameUser = await userModel.findOne({ username });
    if (usernameUser){
       req.flash("error", "please login again onther account, or try to login");
      return res.redirect('/register');
    } 

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
    res.redirect("/profile");
};

module.exports.postLoginController = async (req, res) => {
    let { emailorusername, password } = req.body;
    let user = await userModel
      .findOne({ email: emailorusername })
      .select("+password");
      console.log(user);
    if (!user)
      return res.send("you are not registered || please create a new account");
    let result = await bcrypt.compare(password, user.password);
    if (result) {
      let token = jwt.sign(
        { id: user._id, email: user.email },
        process.env.JWT_SECRET_KEY
      );
      res.cookie("token", token);
      res.redirect("/profile");
    } else {
      res.redirect("/register");
    }
};

// logout user

module.exports.logoutController = async (req, res) => {
    res.cookie("token", "");
    res.redirect("/");
};

// profile user

module.exports.profileController = async (req, res) => {
  let byDate = Number(req.query.byDate);
  let {startDate, endDate} = req.query;

  byDate = byDate ? byDate : -1;
  startDate = startDate ? startDate : new Date("1970-01-01");
  endDate = endDate ? endDate : new Date();

  let user = await userModel.findOne({ email: req.user.email }).populate({
    path: "hisaab",
    match: {createdAt: {$gte: startDate, $lte: endDate}},
    options: {sort: {createdAt: byDate}}
  });
    res.render("profile", { user });
};

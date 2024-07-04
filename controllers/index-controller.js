const userModel = require("../models/user-model");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

module.exports.landingPageController = (req, res) => {
  res.render("index");
};

module.exports.registerPageController = (req, res) => {
  res.render("register", { error: true });
};

module.exports.postRegisterPageController = async (req, res) => {
  try{
    let { name, username, email, password } = req.body;
  let user = await userModel.findOne({ email });
  if (user) return res.send("you are already registered please login");

  let salt = await bcrypt.genSalt(10);
  let hash = await bcrypt.hash(password, salt);

  user = await userModel.create({ email, name, username, password: hash });

  let token = jwt.sign(
    { id: user._id, email: user.email },
    process.env.JWT_SECRET_KEY
  );
  res.cookie("token", token);
  res.send("account created successfully")
  }
  catch(err){
    res.send(err.message);
  }
};

module.exports.postLoginController = async (req, res) => {
    let { email, password} = req.body;
    let user = await userModel.findOne({ email }).select("+password");
    console.log(user);
    if(!user) return res.send("you are not registered || please create a new account");
    let result = await bcrypt.compare(password, user.password);
    res.send(result);
};

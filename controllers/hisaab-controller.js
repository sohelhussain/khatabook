const hisaabModel = require("../models/hisab-model");

module.exports.hisaabPageController = (req, res, next) => {
  res.render("create");
};
module.exports.createHisaabController = async (req, res, next) => {
  let {
    title,
    description,
    encrypted,
    shareable,
    passcode,
    editpermissions,
    user,
  } = req.body;
  encrypted = encrypted === "on" ? true : false;
  shareable = shareable === "on" ? true : false;
  editpermissions = encrypted === "on" ? true : false;

  const hisaab = await hisaabModel.create({
    title,
    description,
    user: req.user._id,
    passcode,
    encrypted,
    shareable,
    editpermissions,
  });
  console.log(hisaab);
  req.user.hisaab.push(hisaab._id);
  await req.user.save();
  res.redirect("/profile");
};

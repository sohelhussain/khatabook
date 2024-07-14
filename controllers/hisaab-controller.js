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
  req.user.hisaab.push(hisaab._id);
  await req.user.save();
  res.redirect("/profile");
};

module.exports.readHisaabController = async (req, res, next) => {
  let id = req.params.id
  let hisaab = await hisaabModel.findOne({_id: id})

  if(!hisaab) return res.redirect("/profile");


  if(hisaab.encrypted) return res.render('passcode', {nav: true, id})
  res.render('hisaab', {nav: true, hisaab})
};
module.exports.deleteHisaabController = async (req, res, next) => {
  let id = req.params.id
  let hisaab = await hisaabModel.findOne({_id: id, user: req.user._id})
  if(!hisaab) return res.redirect('/profile')
    await hisaabModel.deleteOne({_id: id});
  res.redirect('/profile')
};
module.exports.editHisaabController = async (req, res, next) => {
  let error =  req.flash('error')
  let id = req.params.id
  let hisaab = await hisaabModel.findOne({_id: id, user: req.user._id})
  if(!hisaab) return res.redirect('/profile');

  res.render('edit', {nav: true, hisaab, error})
};
module.exports.postEditController = async (req, res, next) => {
  let id = req.params.id
  let hisaab = await hisaabModel.findOne({_id: id, user: req.user._id})
  if(!hisaab) return res.redirect('/profile');


  hisaab.title = req.body.title
  hisaab.description = req.body.description
  hisaab.editpermissions = req.body.editPermission == 'on' ? true : false;
  hisaab.encrypted = req.body.encrypted == 'on' ? ture : false;
  hisaab.shareable  = req.body.shareable == 'on' ? ture : false;
  hisaab.passcode = req.body.passcode

  await hisaab.save()

  res.redirect('/profile');
}
module.exports.readVerifidHisaabController = async (req, res, next) => {
  const id = req.params.id
  const hisaab = await hisaabModel.findOne({_id: id});
  if(!hisaab) return res.redirect('/profile');
  if(hisaab.passcode !== req.body.passcode) return res.redirect('/profile');
  res.render('hisaab', {nav: true, hisaab})
}
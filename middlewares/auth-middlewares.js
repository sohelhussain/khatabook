const jwt = require('jsonwebtoken');
const userModel = require('../models/user-model');

module.exports.isLoggedIn = async (req,res, next) => {
    if(req.cookies.token === ''){
        res.redirect('/');
    }else{
        const data = jwt.verify(req.cookies.token, process.env.JWT_SECRET_KEY);
        const oldUser = await userModel.findOne({_id: data.id});
        if(oldUser){
            req.user = oldUser;
        }
    }
    next();
}
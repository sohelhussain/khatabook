const express = require("express");
const router = express.Router();
const {createHisaabController, hisaabPageController} =require('../controllers/hisaab-controller');
const {isLoggedIn} = require('../middlewares/auth-middlewares')

router.get('/create', isLoggedIn, hisaabPageController)
router.post('/create', isLoggedIn, createHisaabController)

module.exports = router
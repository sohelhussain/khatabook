const express = require("express");
const router = express.Router();
const {createHisaabController, hisaabPageController, readHisaabController, deleteHisaabController, editHisaabController, postEditController, readVerifidHisaabController} =require('../controllers/hisaab-controller');
const {isLoggedIn} = require('../middlewares/auth-middlewares')

router.get('/create', isLoggedIn, hisaabPageController)
router.post('/:id/verify', isLoggedIn, readVerifidHisaabController)
router.get('/view/:id', isLoggedIn, readHisaabController)
router.get('/delete/:id', isLoggedIn, deleteHisaabController)
router.get('/edit/:id', isLoggedIn, editHisaabController)
router.post('/create', isLoggedIn, createHisaabController)
router.post('/edit/:id', isLoggedIn, postEditController)

module.exports = router
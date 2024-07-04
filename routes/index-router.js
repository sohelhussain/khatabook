const express = require('express');
const router = express.Router();
const { landingPageController, registerPageController, postRegisterPageController, postLoginController } = require('../controllers/index-controller');

router.get('/', landingPageController);
router.get('/register', registerPageController);

router.post('/login', postLoginController);
router.post('/register', postRegisterPageController);

module.exports = router;
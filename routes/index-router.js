const express = require("express");
const router = express.Router();
const {
  landingPageController,
  registerPageController,
  postRegisterPageController,
  postLoginController,
  logoutController,
  profileController,
} = require("../controllers/index-controller");
const { isLoggedIn } = require("../middlewares/auth-middlewares");

router.get("/", landingPageController);
router.get("/register", registerPageController);
router.get("/logout", logoutController);
router.get("/profile", isLoggedIn, profileController);

router.post("/login", postLoginController);
router.post("/register", postRegisterPageController);

module.exports = router;

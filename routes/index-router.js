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
const { isLoggedIn, redirectToProfile } = require("../middlewares/auth-middlewares");

router.get("/", redirectToProfile,landingPageController);
router.get("/register", redirectToProfile,registerPageController);
router.get("/logout", logoutController);
router.get("/profile", isLoggedIn, profileController);

router.post("/login", postLoginController);
router.post("/register", postRegisterPageController);

module.exports = router;

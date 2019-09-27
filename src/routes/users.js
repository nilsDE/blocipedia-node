const express = require("express");
const router = express.Router();
const validation = require("./validation");
const userController = require("../controllers/userController");

router.get("/users/signup", userController.signUpForm);
router.post("/users/signup", validation.validateUsers, userController.create);
router.get("/users/signin", userController.signInForm);
router.post("/users", validation.validateUsers, userController.signIn);
router.get("/users/signout", userController.signOut);
router.get("/users/account", userController.show);
router.get("/users/upgrade", userController.upgradeForm);
router.post("/users/:id/upgrade", userController.upgrade);
router.get("/users/upgrade-success", userController.seeUpgradeSuccess);
router.post("/users/:id/downgrade", userController.downgrade);

module.exports = router;
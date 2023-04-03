const express = require("express");
const router = express.Router();
const userCtrl = require("../controller/user.controller");

//get
router.get("/", userCtrl.protect, userCtrl.getUser);
router.get("/is-authencated", userCtrl.protect, userCtrl.isAuthencated);
router.get("/get-all", userCtrl.getAllUsers);

//post
router.post("/register", userCtrl.register);
router.post("/login", userCtrl.login);

//put
router.put("/edit", userCtrl.protect, userCtrl.editUser);

//patch
router.patch("/change-password", userCtrl.protect, userCtrl.changePassword);

module.exports = router;

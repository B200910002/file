const express = require("express");
const router = express.Router();
const userCtrl = require("../controller/user.controller");

//get
router.get("/is-authencated", userCtrl.protect, userCtrl.isAuthencated);
router.get("/:id/verify/:token", userCtrl.emailVerify);
router.get("/get/:email", userCtrl.protect, userCtrl.getUser);
router.get("/get-all", userCtrl.getAllUsers);

//post
router.post("/register", userCtrl.register);
router.post("/login", userCtrl.login);
router.post("/upload-picture", userCtrl.uploadPic);

//put
router.put("/edit-user", userCtrl.protect, userCtrl.editUser);

//patch
router.patch("/change-password", userCtrl.protect, userCtrl.changePassword);

module.exports = router;

const express = require("express");
const router = express.Router();
const userCtrl = require('../controller/user.controller')
const fileCtrl = require("../controller/file.controller");

//get
router.get("/", userCtrl.protect, fileCtrl.getAllFiles);
router.get("/categories", fileCtrl.getAllCategories);
router.post("/extentions", fileCtrl.getAllExtentions);

//post
router.post('/import-categories', fileCtrl.importCategories)
router.post('/import-extentions', fileCtrl.importExtentions)
router.post('/upload', userCtrl.protect, fileCtrl.uploadFile, fileCtrl.createFile);

//delete
router.delete('/delete/:id', )

module.exports = router;

require("dotenv").config();
const express = require("express");
const app = express();
const cors = require("cors");
const fileUpload = require("express-fileupload");
const mongodb = require("./database/mongodb");
const postgresql = require("./database/postgresql");

//database connections
mongodb.connect();
postgresql.connect();

//api
const API = require("./api/Api");

//routes
const fileRoute = require("./router/file.router");
const userRoute = require("./router/user.router");

//uses
app.use(fileUpload());
app.use("/public", express.static("public"));
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(cors());

//use api
app.use(API.userApi, userRoute);
app.use(API.fileAPI, fileRoute);

app.listen(process.env.PORT, () => {
  console.log(process.env.LOCAL_HOST_PORT);
});

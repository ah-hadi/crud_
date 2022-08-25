var express = require("express");
// const multer = require("multer");
// import morgan from "morgan";
// const upload = multer({ dest: "/uploads" });
var cors = require("cors");
var app = express();
var port = 8080;
const route = require("./router/router");
const bodyParser = require("body-parser");
const mongoose = require("mongoose");

mongoose.connect("mongodb://localhost:27017/superadmin", {
  useUnifiedTopology: true,
  useNewurlParser: true,
});
app.use(cors());
app.use(bodyParser.json());
app.use("/", route);
app.listen(port || 8080, function () {
  var datetime = new Date();
  var message = "Server running on port:-" + port + "Started at:-" + datetime;
  console.log(message);
});

const { response } = require("express");
let jwt = require("jwt-decode");
const { model } = require("../model/userschema");

function user(req, res, next) {
  // console.log("jwt");

  var token = req.headers["authorization"];

  // console.log("token in middleware:", token);
  if (!token) {
    return res.status(404).send("invalid token");
  }
  const token1 = token.split(" ");
  const token2 = token1[1];
  var decode = jwt(token2);
  // console.log(decode);
  // console.log(token);
  // console.log(req.headers.authorization);
  req.email = decode.email;
  if (decode.role == "admin") {
    next();
  } else {
    return res.status(404).send("unauthorized");
  }
}

function userredirect(req, res, next) {
  // console.log("jwt");

  var token = req.headers["authorization"];

  console.log("token in middleware:", token);

  if (!token) {
    return res.status(404).send("invalid token");
  }
  const token1 = token.split(" ");
  const token2 = token1[1];
  var decode = jwt(token2);
  // console.log(decode);
  req.role = decode.role;
  req.email = decode.email;
  if (decode.role == "admin" || decode.role == "user") {
    next();
  } else {
    return res.status(404).send("unauthorized");
  }
}

function onlyuser(req, res, next) {
  var token = req.headers.authorization.split(" ")[1];
  var decode = jwt.verify(token, "my super secret key");
  req.email = decode.email;
  if (decode.role == "user") {
    next();
  } else {
    return res.status(404).send("unauthorized");
  }
}

module.exports = { user, onlyuser, userredirect };

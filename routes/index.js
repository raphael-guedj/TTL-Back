var express = require("express");
var router = express.Router();
var invitationModel = require("../models/invitation");
var userModel = require("../models/user");
var uid2 = require("uid2");
var SHA256 = require("crypto-js/sha256");
var encBase64 = require("crypto-js/enc-base64");

/* GET home page. */
router.get("/", function (req, res, next) {
  res.render("index", { title: "Express" });
});

router.post("/sign-up", async function (req, res, next) {
  var salt = uid2(32);
  var newUser = new userModel({
    name: req.body.name,
    email: req.body.email,
    salt: salt,
    password: SHA256(req.body.password + salt).toString(encBase64),
    token: uid2(32),
  });
  var user = await newUser.save();
  res.json({ result: true, message: "Requête ok", user });
});

router.post("/sign-in", async function (req, res) {
  var userExists = await userModel.findOne({
    email: req.body.email,
  });
  if (userExists) {
    console.log(userExists);
    var token = userExists.token;
    var hash = SHA256(req.body.password + userExists.salt).toString(encBase64);
  }

  if (
    userExists &&
    req.body.email !== "" &&
    req.body.password !== "" &&
    hash === userExists.password
  ) {
    res.json({ result: true, message: "Sign-in OK", userExists });
  } else {
    res.json({
      result: false,
      message:
        "Au moins une des informations est invalide, vérifiez les champs.",
    });
  }
});

module.exports = router;

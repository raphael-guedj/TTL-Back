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
  var userExists = await userModel.findOne({
    email: req.body.email,
  });
  if (!userExists) {
    var salt = uid2(32);
    var newUser = new userModel({
      name: req.body.name,
      email: req.body.email,
      salt: salt,
      password: SHA256(req.body.password + salt).toString(encBase64),
      token: uid2(32),
    });
    var user = await newUser.save();
    res.json({ result: true, message: "Requête ok!", user });
  } else {
    res.json({
      result: false,
      message: "Un utilisateur existe déjà avec cet email!",
    });
  }
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

router.get("/get-user", async function (req, res, next) {
  var user = await userModel.findOne({ token: req.query.token });
  // console.log("mon user", user);
  if (user) {
    res.json({ result: true, user });
  } else {
    res.json({ result: false });
  }
});

router.get("/get-alluser", async function (req, res) {});

router.post("/new-invitation", async function (req, res, next) {
  var newInvitation = new invitationModel({
    message: req.body.message,
    date: req.body.date,
    heure: req.body.hour,
    temps_propose: req.body.duration,
    cuisine_propose: req.body.kitchen,
    lieu_propose: req.body.location,
    adresse: req.body.address,
    statut_invit: req.body.statut,
    id_sender: req.body.sender,
    id_receiver: req.body.receiver,
    notif_lu: req.body.read,
  });
  await newInvitation.save();
  res.json({ response: true, message: "Message bien envoyé", newInvitation });
});

module.exports = router;

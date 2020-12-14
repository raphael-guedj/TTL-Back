var express = require("express");
var router = express.Router();
var invitationModel = require("../models/invitation");
var userModel = require("../models/user");
var uid2 = require("uid2");
var SHA256 = require("crypto-js/sha256");
var encBase64 = require("crypto-js/enc-base64");
const fs = require("fs");
var uniqid = require("uniqid");
var cloudinary = require("cloudinary").v2;

cloudinary.config({
  cloud_name: "djsgv53qh",
  api_key: "695523746364995",
  api_secret: "8_nYfSA9ExicVEAmocPNAFZEJIY",
});

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
      isConnected: true,
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
    // console.log(userExists);
    var hash = SHA256(req.body.password + userExists.salt).toString(encBase64);
  }

  if (
    userExists &&
    req.body.email !== "" &&
    req.body.password !== "" &&
    hash === userExists.password
  ) {
    await userModel.updateOne(
      {
        email: req.body.email,
      },
      {
        isConnected: true,
      }
    );
    // console.log(userExists);
    res.json({ result: true, message: "Sign-in OK", userExists });
  } else {
    res.json({
      result: false,
      message:
        "Au moins une des informations est invalide, vérifiez les champs.",
    });
  }
});

router.get("/logout", async function (req, res, next) {
  // console.log(req.query.token);
  var user = await userModel.findOne({ token: req.query.token });
  // console.log("mon user", user);
  if (user) {
    await userModel.updateOne(
      {
        token: req.query.token,
      },
      {
        isConnected: false,
      }
    );
    // console.log(user);
    res.json({ result: true });
  } else {
    res.json({ result: false });
  }
});

router.get("/delete-user", async function (req, res, next) {
  // console.log(req.query.id);
  await userModel.deleteOne({
    _id: req.query.id,
  });
  res.json({ result: true });
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

router.get("/alluser", async function (req, res) {
  let allUser = await userModel.find();
  let myId = req.query.id;
  // console.log("avec mon id", allUser);
  // console.log(myId);

  let userExcl = allUser.filter((user) => user._id != myId);
  // console.log("sans mon id", userExcl);

  if (allUser) {
    res.json({ result: true, userExcl });
  } else {
    res.json({ result: false });
  }
});

router.get("/getmydata", async function (req, res) {
  let myUser = await userModel.findOne({ _id: req.query.id });
  // console.log("user", myUser);
  // console.log(myId);

  if (myUser) {
    res.json({ result: true, myUser });
  } else {
    res.json({ result: false });
  }
});

router.post("/uploadPhoto", async function (req, res, next) {
  var myUser = await userModel.findOne({ _id: req.query.id });
  let imagePath = "./imgtmp/" + uniqid() + ".jpg";
  let resultCopy = await req.files.photo.mv(imagePath);
  // console.log(myUser);
  let resultCloudinary = await cloudinary.uploader.upload(imagePath);
  let cloudinaryUrl = JSON.stringify(resultCloudinary.secure_url);
  console.log("tot", cloudinaryUrl);

  if (myUser && !resultCopy) {
    await userModel.updateOne(
      {
        _id: req.query.id,
      },
      {
        photo: resultCloudinary.secure_url,
      }
    );
    console.log(myUser);

    res.json({
      result: true,
    });
  } else {
    res.json({ result: false, message: resultCopy });
  }

  fs.unlinkSync(imagePath);
});

router.post("/recordmydata", async function (req, res) {
  // console.log(req.body);
  var myData = await userModel.updateOne(
    {
      _id: req.body.id,
    },
    {
      name: req.body.name,
      email: req.body.email,
      profession: req.body.job,
      city: req.body.city,
      arrondissement: req.body.postcode,
      secteur: req.body.activity,
      language: JSON.parse(req.body.language),
      description: req.body.text,
      food: JSON.parse(req.body.food),
      wish1: JSON.parse(req.body.wish1),
      wish2: JSON.parse(req.body.wish2),
      wish3: JSON.parse(req.body.wish3),
      wish4: JSON.parse(req.body.wish4),
      wish5: JSON.parse(req.body.wish5),
      wish6: JSON.parse(req.body.wish6),
    }
  );
  // console.log(req.body);
  if (myData) {
    res.json({ result: true, myData });
  } else {
    res.json({ result: false });
  }
});

router.get("/mydataprofile", async function (req, res) {
  // console.log(req.query.id);
  var user = await userModel.findOne({ _id: req.query.id });
  // console.log(user);
  if (
    user.name != "" &&
    user.profession != "" &&
    user.email != "" &&
    user.city != "" &&
    user.arrondissement != "" &&
    user.secteur != "" &&
    user.language != "" &&
    user.description != "" &&
    user.food != ""
  ) {
    res.json({ result: true });
  } else {
    res.json({ result: false });
  }
});

router.post("/new-invitation", async function (req, res, next) {
  // console.log(req.body);

  var newInvitation = new invitationModel({
    message: req.body.message,
    date: req.body.date,
    heure: req.body.hour,
    temps_propose: req.body.duration,
    cuisine_propose: req.body.kitchen,
    lieu_propose: req.body.location,
    adresse: req.body.address,
    statut_invit: "En cours",
    id_sender: req.body.sender,
    id_receiver: req.body.receiver,
    notif_lu: false,
  });
  await newInvitation.save();

  console.log("my invitation", newInvitation);

  var userSender = await userModel.findById(req.body.sender);
  userSender.invitations.push(newInvitation._id);

  var userReceiver = await userModel.findById(req.body.receiver);
  userReceiver.invitations.push(newInvitation._id);

  console.log("mon sender", userSender);

  console.log("mon receiver", userReceiver);

  await userSender.save();
  await userReceiver.save();

  res.json({ response: true, message: "Message bien envoyé" });
});

router.get("/invit-send", async function (req, res, next) {
  const invitationsSend = await invitationModel.find({
    id_sender: req.query.sender,
  });

  res.json({ message: "c'est passé!", invitationsSend });
});

router.get("/invit-received", async function (req, res, next) {
  const invitationsReceived = await invitationModel.find({
    id_receiver: req.query.receiver,
  });

  res.json({ message: "c'est passé!", invitationsReceived });
});

router.get("/history", async function (req, res, next) {
  const user = await userModel
    .findById(req.query.id)
    .populate("invitations")
    .exec();

  console.log("mes invitations", user.invitations);

  res.json({ message: "c'est passé!", user });
});

module.exports = router;

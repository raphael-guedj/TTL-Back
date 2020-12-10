var mongoose = require("mongoose");

var userSchema = mongoose.Schema({
  email: String,
  name: String,
  salt: String,
  password: String,
  token: String,
  isConnected: Boolean,
  photo: String,
  city: String,
  arrondissement: String,
  profession: String,
  secteur: String,
  language: [String],
  description: String,
  food: [String],
  wish1: Boolean,
  wish2: Boolean,
  wish3: Boolean,
  wish4: Boolean,
  wish5: Boolean,
  wish6: Boolean,
  invitations: [{ type: mongoose.Schema.Types.ObjectId, ref: "invitations" }],
});

var userModel = mongoose.model("users", userSchema);

module.exports = userModel;

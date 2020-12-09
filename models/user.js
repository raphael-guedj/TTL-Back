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
  langues: [String],
  description: String,
  envies: [String],
  cuisines: [String],
  invitations: [{ type: mongoose.Schema.Types.ObjectId, ref: "invitations" }],
});

var userModel = mongoose.model("users", userSchema);

module.exports = userModel;

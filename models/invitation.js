var mongoose = require("mongoose");

var invitationSchema = mongoose.Schema({
  message: String,
  date: Date,
  heure: Number,
  temps_propose: Number,
  cuisine_propose: String,
  lieu_propose: String,
  adresse: String,
  statut_invit: String,
  id_sender: String,
  id_receiver: String,
  notif_lu: Boolean,
});

var invitationModel = mongoose.model("invitations", invitationSchema);

module.exports = invitationModel;

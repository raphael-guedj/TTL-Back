var mongoose = require("mongoose");

var options = {
  connectTimeoutMS: 30000,
  useNewUrlParser: true,
  useUnifiedTopology: true,
};

mongoose.connect(
  "mongodb+srv://admin:ZJsZgfHsPOOGFqDy@cluster0.gyhgs.mongodb.net/ttl-bdd?retryWrites=true&w=majority",
  options,
  function (err) {
    console.log(err);
  }
);

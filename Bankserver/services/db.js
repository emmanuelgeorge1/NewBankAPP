const mongoose = require("mongoose");

mongoose.connect(
  " mongodb://admin:admin@cluster0-shard-00-00.a4psm.mongodb.net:27017,cluster0-shard-00-01.a4psm.mongodb.net:27017,cluster0-shard-00-02.a4psm.mongodb.net:27017/myFirstDatabase?ssl=true&replicaSet=atlas-mzvuq7-shard-0&authSource=admin&retryWrites=true&w=majority/bank_server",
  {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  }
);

const User = mongoose.model("User", {
  acno: Number,
  balance: Number,
  username: String,
  password: String,
});
module.exports = {
  User,
};

const mongoose = require("mongoose");

const usersSchema = new mongoose.Schema({
  email: String,
  password: String,
  role: {
    type: String,
    default: "user"
  }
});

const Users = mongoose.model("Users", usersSchema);

module.exports = Users;
const mongoose = require("mongoose");

const usersSchema = new mongoose.Schema({
  username: {type: String, required: true},
  email: {type: String, required: true},
  phone: {type: String, required: true},
  address: {type: String, required: true},
  password: {type: String, required: true},
  role: {
    type: String,
    default: "user",
    required: true
  }
});

const Users = mongoose.model("Users", usersSchema);

module.exports = Users;
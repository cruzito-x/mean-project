const Users = require("../models/usersModel");
const crypto = require("crypto");
const jwt = require("jsonwebtoken");

exports.register = async (req, res) => {
  try {
    req.body.password = crypto.createHash('md5').update(req.body.password).digest('hex');
    const createUser = await Users.create(req.body);
    res.status(200).json(createUser, { message: "User registered successfully" });
  } catch (error) {
    res.status(500).json({ message: error.message });
    console.error("Error to create user: ", error.message);
  }
};

exports.login = async (req, res) => {
  try {
    const user = await Users.findOne({ email: req.body.email }); //Comprobe if mail exists
    if (!user) return res.status(404).json({ message: "User not found" });

    const password = crypto.createHash('md5').update(req.body.password).digest('hex') === user.password; //Comprobe if password exists
    if (!password) return res.status(404).json({ message: "User not found" });

    res.status(200).json({ message: "User logged in successfully", token: generateToken(user), isLoggedIn: true });
  } catch(error) {
    
  }
}

function generateToken(user) {
  const payload = {
    userId: user._id,
    userRole: user.role
  }

  return jwt.sign(payload, 'jwt for cinnatech store');
}
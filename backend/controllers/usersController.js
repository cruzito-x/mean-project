const Users = require("../models/usersModel");
const crypto = require("crypto");
const jwt = require("jsonwebtoken");

exports.register = async (req, res) => {
  try {
    req.body.password = crypto.createHash('md5').update(req.body.password).digest('hex');
    const createUser = await Users.create(req.body);
    res.status(200).json({ createUser, message: "User registered successfully" });
  } catch (error) {
    res.status(500).json({ message: error.message });
    console.error("Error to create user: ", error.message);
  }
};

exports.login = async (req, res) => {
  try {
    const user = await Users.findOne({ email: req.body.email });
    if (!user) return res.status(404).json({ message: "User not found" });

    const password = crypto.createHash('md5').update(req.body.password).digest('hex') === user.password;
    if (!password) return res.status(404).json({ message: "User not found" });

    res.status(200).json({ message: "User logged in successfully", token: generateToken(user), isLoggedIn: true });
  } catch(error) {
    res.status(500).json({ message: error.message });
    console.error("Error to login user: ", error.message);
  }
};

function generateToken(user) {
  const payload = {
    userId: user._id,
    userRole: user.role
  };

  return jwt.sign(payload, 'jwt for cinnatech store', { expiresIn: '1h' });
}

exports.getDetails = async (req, res) => {
  try {
    const user = await Users.findById(req.user.userId);
    if (!user) return res.status(404).json({ message: "User not found" });
    res.status(200).json(user);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

exports.updateUser = async (req, res) => {
  try {
    const updatedFields = {};

    if (req.body.username) updatedFields.username = req.body.username;
    if (req.body.email) updatedFields.email = req.body.email;
    if (req.body.password) updatedFields.password = req.body.password;

    const user = await Users.findByIdAndUpdate(req.user.userId, updatedFields, { new: true });
    if (!user) return res.status(404).json({ message: "User not found" });

    res.status(200).json(user);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
}

exports.deleteUser = async (req, res) => {
  try {
    const user = await Users.findByIdAndDelete(req.user.userId);
    if (!user) return res.status(404).json({ message: "User not found" });
    
    res.status(200).json({ message: "User deleted successfully" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
}
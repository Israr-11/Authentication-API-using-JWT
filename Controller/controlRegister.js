const bcrypt = require("bcrypt");
const dotenv = require("dotenv");
const jwt = require("jsonwebtoken");
const User = require("..model/model");

dotenv.config();

const user_register = async (req, res) => {
  try {
    const { firstName, lastName, email, password } = req.body;

    if (!(firstName && lastName && email && password)) {
      res.status(400).send("All input fields are required");
    }

    const checkUser = await User.findOne({ email });

    if (checkUser) {
      res.status(409).send("User already exist in Database");
      return;
    }

    const encryptPassword = await bcrypt.hash(password, 10);

    const user = await User.create({
      firstName,
      lastName,
      email: email.toLowerCase(),
      password: encryptPassword,
    });

    const token = jwt.sign(
      { user_id: user._id, email },
      process.env.secretKey,
      {
        expiresIn: "3h",
      }
    );

    user.token = token;
    res.status(201).json(user);
  } catch (error) {
    res.status(500).json({
      message: error,
    });
  }
};

const welcome_user = async (req, res) => {
  try {
    res.send("Welcome dear user");
  } catch (error) {
    res.send("Error");
  }
};

module.exports = {
  user_register,
  welcome_user,
};

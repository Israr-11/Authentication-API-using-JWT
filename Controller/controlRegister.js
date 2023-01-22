const bcrypt = require("bcrypt");
const dotenv = require("dotenv");
const jwt = require("jsonwebtoken");
const User = require("../Model/model");

dotenv.config();


const user_register = async (req, res) => {
   try {

      //Extracting the details from body of request to server and doing operations of validation on it
      const { firstName, lastName, email, password } = req.body;

      //Validate user's input
      if (!(firstName && lastName && email && password)) {
         res.status(400).send("All input fields are required")
      }

      //Validate if user exist in our database
      const checkUser = await User.findOne({ email });

      if (checkUser) {
         res.status(409).send("User already exist in Database");
         return;
      }

      //Encrypt Password
      const encryptPassword = await bcrypt.hash(password, 10)


      //Create user in database
      const user = await User.create({
         firstName,
         lastName,
         email: email.toLowerCase(),
         password: encryptPassword,
      })

      //Create new token
      const token = jwt.sign(
         { user_id: user._id, email }, //Payload
         process.env.secretKey,  //Secret Key that are random string defined to sign a token
         {
            expiresIn: "3h", //Expires
         }
      );

      //Save the token
      user.token = token;
      res.status(201).json(user);

   } catch (error) {
      res.status(500).json({
         message: error
      })
   }
}


const welcome_user = async (req, res) => {
   try {
      res.send("Welcome dear user")
   }
   catch (error) {
      res.send("Error")
   }
}

module.exports = {
   user_register,
   welcome_user
}
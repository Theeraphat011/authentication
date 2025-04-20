const User = require("../models/authSchema");
const bcrypt = require("bcrypt");
const { validationResult } = require("express-validator");
const {
   generateAccessToken,
   generateRefreshToken,
} = require("../utils/gennerateToken");
const jwt = require("jsonwebtoken");

exports.register = async (req, res) => {
   const errors = validationResult(req);
   if (!errors.isEmpty())
      return res.status(400).json({ errors: errors.array() });

   try {
      const { username, email, password } = req.body;

      const emailLower = email.toLowerCase();
      const existingUser = await User.findOne({ email: emailLower });

      if (existingUser)
         return res.status(400).json({ message: "User already exists" });

      const hashedPassword = await bcrypt.hash(password, 10);

      const newUser = await User.create({
         username,
         email: emailLower,
         password: hashedPassword,
      });
      await newUser.save();

      res.status(200).json({ message: "User register successfully" });
   } catch (err) {
      console.log(err);
      res.status(500).json({ message: "Server Error" });
   }
};

exports.login = async (req, res) => {
   try {
      const { email, password } = req.body;
      const user = await User.findOne({ email });
      if (!user) return res.status(400).json({ message: "Invalid credential" });

      const isMatch = await bcrypt.compare(password, user.password);
      if (!isMatch) return res.status(400).json({ message: "Error password" });

      const accessToken = generateAccessToken(user);
      const refreshToken = generateRefreshToken(user);

      user.refreshToken = refreshToken;
      await user.save();

      res.status(200).json({
         message: "Login Successfully",
         accessToken,
         refreshToken,
      });
   } catch (err) {
      console.log(err);
      res.status(500).json({ message: "Server Error" });
   }
};

exports.refreshToken = async (req, res) => {
   try {
      const { token } = req.body;
      if (!token) return res.sendStatus(401);

      const user = await User.findOne({ refreshToken: token });
      if (!user) return res.sendStatus(403);

      jwt.verify(token, process.env.JWT_REFRESH_SECRET, (err, decoded) => {
         if (err) return res.sendStatus(403);
         const newAccessToken = generateAccessToken(user);
         res.json({ accessToken: newAccessToken });
      });
   } catch (err) {
      console.log(err);
      res.status(500).json({ message: "Server Error" });
   }
};

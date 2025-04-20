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
      return res
         .status(400)
         .json({ message: "Validation failed", errors: errors.array() });

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

      // console.log(accessToken, refreshToken)

      res.cookie("refreshToken", refreshToken, {
         sameSite: "Lax",
         secure: false,
         path: "/",
         maxAge: 7 * 24 * 60 * 60 * 1000, // 7 วัน
      });

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
   // console.log("Cookies:", req.cookies);
   const token = req.cookies.refreshToken;
   if (!token) {
      console.log("No token provided");
      return res.status(401).json({ message: "No token provided" });
   }

   try {
      const decoded = jwt.verify(token, process.env.JWT_REFRESH_SECRET);
      // console.log("Decoded Token:", decoded);

      const user = await User.findById(decoded.id);
      // console.log("User:", user);

      if (!user) {
         console.log("Invalid refresh token");
         return res.status(403).json({ message: "Invalid refresh token" });
      }

      const accessToken = generateAccessToken(user);
      res.status(200).json({ accessToken });
   } catch (err) {
      console.log("Error verifying token:", err);
      res.status(403).json({ message: "Token expired or invalid" });
   }
};

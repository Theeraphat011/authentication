require("dotenv").config();
const express = require("express");
const cors = require("cors");
const connectDB = require("./config/db");
const cookieParser = require("cookie-parser");
const authRoutes = require("./routes/authRoutes");
const app = express();

app.use(
   cors({
      origin: "http://localhost:5173", // ระบุ origin ของ frontend
      credentials: true, // อนุญาตให้ส่งคุกกี้หรือข้อมูลรับรอง
   })
);
app.use(express.json());
app.use(cookieParser());

app.use("/auth", authRoutes);

connectDB();
app.listen(process.env.PORT, () => {
   console.log("Server is running");
});

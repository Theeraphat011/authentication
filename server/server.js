require("dotenv").config();
const express = require("express");
const cors = require("cors");
const connectDB = require("./config/db");
const cookieParser = require("cookie-parser");
const authRoutes = require("./routes/authRoutes");
const app = express();

app.use(
   cors({
      origin: true,
      credentials: true,
   })
);
app.use(express.json());
app.use(cookieParser());

app.use("/auth", authRoutes);

connectDB();
app.listen(process.env.PORT, () => {
   console.log("Server is running");
});

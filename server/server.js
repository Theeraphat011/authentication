require("dotenv").config();
const express = require("express");
const cors = require("cors");
const connectDB = require("./config/db");
const cookieParser = require("cookie-parser");
const authRoutes = require("./routes/authRoutes");
const app = express();

const allowedOrigins = ['https://auth-jw5ow2j5g-theeraphat011s-projects.vercel.app'];

app.use(cors({
    origin: function(origin, callback) {
        if (allowedOrigins.indexOf(origin) !== -1 || !origin) {
            callback(null, true);
        } else {
            callback(new Error('Not allowed by CORS'));
        }
    }
}));
app.use(express.json());
app.use(cookieParser());

app.use("/auth", authRoutes);

connectDB();
app.listen(process.env.PORT, () => {
   console.log("Server is running");
});

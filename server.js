const express = require("express");
const path = require("path");
const dotenv = require("dotenv");
const connectDB = require("./config/db");
const UserRoute = require("./routes/user");
const AuthRoute = require("./routes/auth");
const ResumeRoute = require("./routes/resume");

//Load environment variables
dotenv.config({ path: "./config/config.env" });

//Connect to database
connectDB();

const app = express();

//Bodyparser
app.use(express.json({ extended: false }));

const PORT = process.env.PORT || 5000;

//Load route files
app.use("/api/users", UserRoute);
app.use("/api/auth", AuthRoute);
app.use("/api/resume", ResumeRoute);

const server = app.listen(
  PORT,
  console.log(`Server running in ${process.env.NODE_ENV} mode on port ${PORT}`)
);

process.on("unhandledRejection", (err, promise) => {
  console.log(`Error: ${err.message}`);
  server.close(() => process.exit(1));
});

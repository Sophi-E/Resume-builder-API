const express = require("express");
const path = require("path");
const dotenv = require("dotenv");
const cors = require("cors");
const connectDB = require("./config/db");
const UserRoute = require("./routes/user");
const AuthRoute = require("./routes/auth");
const ResumeRoute = require("./routes/resume");

//Load environment variables
dotenv.config({ path: "./config/config.env" });

//Connect to database
connectDB();

const app = express();

app.use(
  cors({
    origin: "http://localhost:3000",
  })
);

//Bodyparser
app.use(express.json({ extended: false }));

const PORT = process.env.PORT || 5000;

//Load route files
app.use("/api/users", UserRoute);
app.use("/api/auth", AuthRoute);
app.use("/api/resume", ResumeRoute);

const server = app.listen(PORT, console.log(`Server running on port ${PORT}`));

process.on("unhandledRejection", (err, promise) => {
  console.log(`Error: ${err.message}`);
  server.close(() => process.exit(1));
});

//TODO change allowed origin from local host

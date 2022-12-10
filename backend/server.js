
require("dotenv").config();

const express = require("express");
const cors = require('cors')
const router = require("./router/router");
const app = express();
const port = process.env.PORT || 3000;
const cookieParser = require("cookie-parser");

//Enable all cors for all request
app.use(cors());
app.use(express.json());
app.use(cookieParser());
app.use(router.router);

app.get("/", (req, res) => {
  res.json({ message: "Welcome to da boyz hobby corner." });
});

app.listen(port, (error) => {
  if (!error) {
    console.log(`Server is running on port ${port}`);
  } else {
    console.log("Error occurred", error);
  }
});
require("dotenv").config();

const express = require("express");
const cors = require('cors')
const router = require("./router/router");
const app = express();
const port = process.env.PORT || 8000;
const cookieParser = require("cookie-parser");

app.all('/*', function(req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "X-Requested-With");
  next();
});

const corsConfig = {
  credentials: true,
  origin: true,
};

//Enable all cors for all request
app.use(cors(corsConfig));
app.use(express.json());
app.use(cookieParser());
app.use(router.router);
app.options('*', cors());

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



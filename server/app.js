// importing npm modules
const express = require("express"),
  passport = require("passport"),
  mongoose = require("mongoose"),
  cors = require("cors"),
  path = require("path"),
  bodyparser = require("body-parser");

// starting the server
const app = express();

// fetching the port number
const port = process.env.PORT || 5000;



// listening the server
app.listen(port, () => console.log(`Server is running at port ${port}`));
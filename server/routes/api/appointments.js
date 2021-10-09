// importing the required modules
const express = require("express"),
  router = express.Router(),
  passport = require("passport"),
  nodemailer = require("nodemailer");

// fetching the schemas
const Hospital = require("../../models/Hospital"),
  Doctor = require("../../models/Doctor");



// exporting the routes
module.exports = router;
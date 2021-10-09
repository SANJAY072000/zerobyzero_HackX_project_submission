// importing the required modules
const express = require("express"),
  router = express.Router(),
  passport = require("passport"),
  nodemailer = require("nodemailer");

// fetching the schemas
const Hospital = require("../../models/Hospital"),
  Doctor = require("../../models/Doctor");

/*
@type - GET
@route - /api/appointment/locdom
@desc - a route to get location of hospitals/clinics and domain of doctors
@access - PUBLIC
*/
router.get("/locdom", (req, res) => {
  let loc = [],
    dom = [];
  Hospital.find()
    .then((hospital) => {
      hospital.forEach((a) => loc.push(a.hLocation));
      Doctor.find()
        .then((doctor) => {
          doctor.forEach((a) => dom.push(a.domain));
          return res.status(200).json({ loc: loc, dom: dom });
        })
        .catch((err) => console.log(err));
    })
    .catch((err) => console.log(err));
});


// exporting the routes
module.exports = router;
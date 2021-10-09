// importing the required modules
const express = require("express"),
  passport = require("passport"),
  router = express.Router(),
  bcrypt = require("bcryptjs"),
  jsonwt = require("jsonwebtoken"),
  nodemailer = require("nodemailer");

// fetching the schemas
const Hospital = require("../../models/Hospital"),
  Patient = require("../../models/Patient"),
  Doctor = require("../../models/Doctor");

// fetching the setup file
const config = require("../../setup/config");

/*
@type - POST
@route - /api/auth/register/hospital
@desc - a route to register hospital
@access - PUBLIC
*/
router.post("/register/hospital", (req, res) => {
  Hospital.findOne({ hEmail: req.body.hEmail })
    .then((hospital) => {
      if (hospital)
        return res.status(200).json({
          hospitalAlreadyRegistered: "Your hospital is already registered",
        });
      const newHospital = new Hospital({
        hName: req.body.hName,
        hLocation: req.body.hLocation,
        hEmail: req.body.hEmail,
        hPassword: req.body.hPassword,
      });
      bcrypt.genSalt(10, (err, salt) => {
        bcrypt.hash(newHospital.hPassword, salt, (err, hash) => {
          if (err) throw err;
          newHospital.hPassword = hash;
          newHospital
            .save()
            .then((hospital) => res.status(200).json(hospital))
            .catch((err) => console.log(err));
        });
      });
    })
    .catch((err) => console.log(err));
});


// exporting the routes
module.exports = router;
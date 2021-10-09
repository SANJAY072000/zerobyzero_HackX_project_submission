// importing the required modules
const express = require("express"),
  router = express.Router(),
  passport = require("passport"),
  nodemailer = require("nodemailer");
  // stripe = require("stripe")(require("../../../client/src/components/config").swk);

// fetching the schemas
const Hospital = require("../../models/Hospital"),
  Doctor = require("../../models/Doctor");

/*
@type - GET
@route - /api/doctor/credits
@desc - a route to get credits of the hospital
@access - PRIVATE
*/
router.get(
  "/credits",
  passport.authenticate("jwt", { session: false }),
  (req, res) => {
    Hospital.findOne({ _id: req.user._id })
      .then((hospital) => res.status(200).json({ credits: hospital.credits }))
      .catch((err) => console.log(err));
  }
);

/*
@type - GET
@route - /api/doctor/listOfDoctors
@desc - a route to get all doctors of the hospital
@access - PRIVATE
*/
router.get(
  "/listOfDoctors",
  passport.authenticate("jwt", { session: false }),
  (req, res) => {
    Doctor.find({ user: req.user._id })
      .then((doctor) => res.status(200).json(doctor))
      .catch((err) => console.log(err));
  }
);

/*
@type - POST
@route - /api/doctor/addDoctor
@desc - a route to add doctors to the hospital
@access - PRIVATE
*/
router.post(
  "/addDoctor",
  passport.authenticate("jwt", { session: false }),
  (req, res) => {
    const doctorValues = {};
    doctorValues.user = req.user._id;
    if (req.body.name) doctorValues.name = req.body.name;
    if (req.body.img) doctorValues.img = req.body.img;
    if (req.body.domain) doctorValues.domain = req.body.domain;
    Hospital.findOne({ _id: req.user._id })
      .then((hospital) => {
        hospital.credits--;
        hospital
          .save()
          .then((hospital) => {
            new Doctor(doctorValues)
              .save()
              .then((doctor) => res.status(200).json(doctor))
              .catch((err) => console.log(err));
          })
          .catch((err) => console.log(err));
      })
      .catch((err) => console.log(err));
  }
);



// exporting the routes
module.exports = router;
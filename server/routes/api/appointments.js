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

/*
@type - POST
@route - /api/appointment/docs
@desc - a route to get the doctors according to the filters
@access - PUBLIC
*/
router.post("/docs", (req, res) => {
  let dol = [];
  Hospital.find({ hLocation: req.body.loc })
    .then((hospital) => {
      Doctor.find({ domain: req.body.dom })
        .then((doctor) => {
          hospital.forEach((a) => {
            doctor.forEach((b) => {
              if (a._id.toString() === b.user.toString()) dol.push(b);
            });
          });
          return res.status(200).json({ dol });
        })
        .catch((err) => console.log(err));
    })
    .catch((err) => console.log(err));
});

/*
@type - GET
@route - /api/appointment/book-:dcid-:ptemid
@desc - a route to book an appointment with the doctor
@access - PUBLIC
*/
router.get("/book-:dcid-:ptemid", (req, res) => {
  Doctor.findOne({ _id: req.params.dcid })
    .then((doctor) => {
      doctor.totalToken++;
      Hospital.findOne({ _id: doctor.user })
        .then((hospital) => {
          doctor
            .save()
            .then((doctor) => {
              return res
                .status(200)
                .json({
                  appointmentSuccess: "Appointment Placed Successfully",
                });
            })
            .catch((err) => console.log(err));
        })
        .catch((err) => console.log(err));
    })
    .catch((err) => console.log(err));
});


// exporting the routes
module.exports = router;
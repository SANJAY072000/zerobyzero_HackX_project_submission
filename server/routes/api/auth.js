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

/*
@type - POST
@route - /api/auth/login/hospital
@desc - a route to login hospital
@access - PUBLIC
*/
router.post("/login/hospital", (req, res) => {
  const hEmail = req.body.hEmail,
    hPassword = req.body.hPassword;
  Hospital.findOne({ hEmail })
    .then((hospital) => {
      if (!hospital)
        return res
          .status(200)
          .json({ hospitalNotRegistered: "Your hospital is not registered" });
      bcrypt
        .compare(hPassword, hospital.hPassword)
        .then((isCorrect) => {
          if (isCorrect) {
            const payload = {
              id: hospital._id,
              hName: hospital.hName,
              hEmail: hospital.hEmail,
              hPassword: hospital.hPassword,
              hLocation: hospital.hLocation,
              credits: hospital.credits,
            };
            jsonwt.sign(
              payload,
              config.secret,
              { expiresIn: 3600 },
              (err, token) => {
                if (err) throw err;
                res
                  .status(200)
                  .json({ success: true, token: `Bearer ${token}` });
              }
            );
          } else
            return res.status(200).json({
              passwordIncorrect: "Your hospital password is incorrect",
            });
        })
        .catch((err) => console.log(err));
    })
    .catch((err) => console.log(err));
});

/*
@type - POST
@route - /api/auth/register/patient
@desc - a route to register patient
@access - PUBLIC
*/
router.post("/register/patient", (req, res) => {
  Patient.findOne({ pEmail: req.body.pEmail })
    .then((patient) => {
      if (patient)
        return res.status.json({
          patientAlreadyRegistered: "You are already registered",
        });
      const newPatient = new Patient({
        pName: req.body.pName,
        pEmail: req.body.pEmail,
        pPassword: req.body.pPassword,
      });
      bcrypt.genSalt(10, (err, salt) => {
        bcrypt.hash(newPatient.pPassword, salt, (err, hash) => {
          if (err) throw err;
          newPatient.pPassword = hash;
          newPatient
            .save()
            .then((patient) =>res.status(200).json(patient))
            .catch((err) => console.log(err));
        });
      });
    })
    .catch((err) => console.log(err));
});

/*
@type - POST
@route - /api/auth/login/patient
@desc - a route to login patient
@access - PUBLIC
*/
router.post("/login/patient", (req, res) => {
  const pEmail = req.body.pEmail,
    pPassword = req.body.pPassword;
  Patient.findOne({ pEmail })
    .then((patient) => {
      if (!patient)
        return res
          .status(200)
          .json({ patientNotRegistered: "You are not registered" });
      bcrypt
        .compare(pPassword, patient.pPassword)
        .then((isCorrect) => {
          if (isCorrect) {
            res
              .status(200)
              .json({ loggedInSuccessfully: "You are successfully logged in" });
          } else
            return res
              .status(200)
              .json({ passwordIncorrect: "You entered a wrong password" });
        })
        .catch((err) => console.log(err));
    })
    .catch((err) => console.log(err));
});

/*
@type - GET
@route - /api/auth/testlogin/hospital
@desc - a route to test login of the hospital
@access - PRIVATE
*/
router.get(
  "/testlogin/hospital",
  passport.authenticate("jwt", { session: false }),
  (req, res) => {
    Hospital.findOne({ _id: req.user._id })
      .then((hospital) => res.status(200).json(hospital))
      .catch((err) => console.log(err));
  }
);

/*
@type - DELETE
@route - /api/auth/delete
@desc - a route to delete hospital account
@access - PRIVATE
*/
router.delete(
  "/delete",
  passport.authenticate("jwt", { session: false }),
  (req, res) => {
    Doctor.find({ user: req.user._id })
      .then((doctor) => {
        doctor.forEach((a) => {
          Doctor.findOneAndRemove({ _id: a._id })
            .then(() => console.log("Removed Successfully"))
            .catch((err) => console.log(err));
          Hospital.findOneAndRemove({ _id: req.user._id })
            .then(() =>
              res.status(200).json({ Deleted: "Removed Successfully" })
            )
            .catch((err) => console.log(err));
        });
      })
      .catch((err) => console.log(err));
  }
);

// exporting the routes
module.exports = router;
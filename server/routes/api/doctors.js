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


// exporting the routes
module.exports = router;
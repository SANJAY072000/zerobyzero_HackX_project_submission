// importing the required modules
const mongoose = require("mongoose"),
  Schema = mongoose.Schema;

// creating the schema
const patientSchema = new Schema({
  pName: {
    type: String,
    required: true,
  },
  pEmail: {
    type: String,
    required: true,
  },
  pPassword: {
    type: String,
    required: true,
  },
});

// exporting the schema
module.exports = mongoose.model("patient", patientSchema);
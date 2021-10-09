// importing the required modules
const mongoose = require("mongoose"),
  Schema = mongoose.Schema;

// creating the schema
const hospitalSchema = new Schema({
  hName: {
    type: String,
    required: true,
  },
  hLocation: {
    type: String,
    required: true,
  },
  hEmail: {
    type: String,
    required: true,
  },
  hPassword: {
    type: String,
    required: true,
  },
  credits: {
    type: Number,
    default: 0,
  },
});

// exporting the schema
module.exports = mongoose.model("hospital", hospitalSchema);
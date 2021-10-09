// importing the required modules
const mongoose = require("mongoose"),
  Schema = mongoose.Schema;

// creating the schema
const doctorSchema = new Schema({
  user: {
    type: Schema.Types.ObjectId,
    ref: "hospital",
  },
  name: {
    type: String,
    required: true,
  },
  img: {
    type: String,
    required: true,
  },
  currentToken: {
    type: Number,
    default: 0,
  },
  totalToken: {
    type: Number,
    default: 0,
  },
  status: {
    type: String,
    default: "Inactive",
  },
  domain: {
    type: String,
    required: true,
  },
});

// exporting the schema
module.exports = mongoose.model("doctor", doctorSchema);
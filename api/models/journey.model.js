// import mongoose from "mongoose";
const mongoose = require("mongoose");

const journeySchema = mongoose.Schema({
  busNo: {
    type: String,
    required: true,
  },
  passenger: {
    type: mongoose.Schema.Types.ObjectId,
    required: true,
  },
  startLocation: {
    type: String,
    required: true,
  },
  endLocation: {
    type: String,
    required: true,
  },
  fare: {
    type: Number,
    required: true,
  },
  date: {
    type: String,
  },
});

const Journey = mongoose.model("Journey", journeySchema);

// export default Journey;
module.exports = Journey;

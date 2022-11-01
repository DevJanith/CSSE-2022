const mongoose = require("mongoose");
const Journey = require("../models/journey.model.js");

// Add journey to the system
const addJourney = async (req, res) => {
  const { busNo, passenger, startLocation, endLocation, fare, date } = req.body;

  const journey = {
    busNo,
    passenger,
    startLocation,
    endLocation,
    fare,
    date,
  };
  const newJourney = new Journey(journey);
  try {
    await newJourney.save();

    res.json({
      data: newJourney,
      msg: "success",
      code: "00",
      type: "POST",
    });
  } catch (error) {
    res.status(409);
    res.json({ message: error.message });
    console.log(error);
  }
};

// Get All journeys
const getJourneys = async (req, res) => {
  try {
    const journeys = await Journey.find();

    res.status(200);
    var sum = 0;
    journeys.forEach((element) => {
      sum = sum + element.fare;
    });
    console.log(sum);
    res.json({
      data: journeys,
      totalAmount: sum,
    });
  } catch (error) {
    console.log(error);

    res.status(404);
    res.json({ message: error.message });
  }
};

// Get journeys of a user
const getJourneysOfaUser = async (req, res) => {
  const id = req.params.id;
  try {
    const journeys = await Journey.find({ passenger: id });

    res.status(200);
    res.json(journeys);
  } catch (error) {
    res.status(404);
    res.json({ message: error.message });
  }
};

module.exports = {
  addJourney,
  getJourneys,
  getJourneysOfaUser,
};

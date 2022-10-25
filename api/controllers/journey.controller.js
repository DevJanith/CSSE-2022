import mongoose from "mongoose";
import Journey from "../models/journey.model.js";

export const addJourney = async (req, res) => {
  const { busNo, passenger, startLocation, endLocation, fare } = req.body;

  const journey = {
    busNo,
    passenger,
    startLocation,
    endLocation,
    fare,
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

export const getJourneys = async (req, res) => {
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

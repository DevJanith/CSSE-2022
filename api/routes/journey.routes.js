const express = require("express");
const {
  addJourney,
  getJourneys,
  getJourneysOfaUser,
} = require("../controllers/journey.controller.js");

const router = express.Router();

router.post("/add-journey", addJourney);
router.get("/all", getJourneys);
router.get("/get/:id", getJourneysOfaUser);

module.exports = router;

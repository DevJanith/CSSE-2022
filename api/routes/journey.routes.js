import express from "express";
import { addJourney, getJourneys } from "../controllers/journey.controller.js";

const router = express.Router();

router.post("/add-journey", addJourney);
router.get("/all", getJourneys);

export default router;

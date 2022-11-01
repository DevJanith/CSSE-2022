const express = require("express");
const {
  createTransport,
  deleteTransport,
  getTransport,
  getTransports,
  updateTransport,
  getTransportReport,
} = require("../controllers/transport.controller.js");

const router = express.Router();

router.get("/", getTransports);
router.post("/", createTransport);
router.get("/:id", getTransport);
router.patch("/:id", updateTransport);
router.delete("/:id", deleteTransport);
router.post("/report", getTransportReport);

module.exports = router;

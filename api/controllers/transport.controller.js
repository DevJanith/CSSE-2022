const mongoose = require("mongoose");
const Transport = require("../models/transport.models.js");

//Get All Transport
const getTransports = async (req, res) => {
  try {
    const Transports = await Transport.find();

    // return {
    //     success: true,
    //     data: Transports
    // }

    res.status(200);
    res.json(Transports);
  } catch (error) {
    console.log(error);

    res.status(404);
    res.json({ message: error.message });

    // return {
    //     success: false,
    //     data: { message: error.message }
    // }
  }
};

//create Transport
const createTransport = async (req, res) => {
  const transport = req.body;

  const newTransport = new Transport(transport);
  try {
    await newTransport.save();

    res.status(201);
    res.json(newTransport);
  } catch (error) {
    res.status(409);
    res.json({ message: error.message });
  }
};
//Get Transport
const getTransport = async (req, res) => {
  const { id } = req.params;

  try {
    const transport = await Transport.findById(id);

    res.status(200);
    res.json(transport);
  } catch (error) {
    res.status(404);
    res.json({ message: error.message });
  }
};

//get Transport Report data
const getTransportReport = async (req, res) => {
  const startDate = req.body.start;
  const endDate = req.body.end;

  try {
    const Transports = await Transport.find({
      createdAt: {
        $gte: startDate,
        $lte: endDate,
      },
    }).sort({
      createdAt: 1,
    });

    res.status(200);

    if (Transports.length != 0) {
      res.json({
        filter: {
          startDate,
          endDate,
        },
        data: Reports,
      });
    } else {
      res.json({
        message: "No Data for selected filter",
        data: null,
      });
    }
  } catch (error) {
    res.status(404);
    res.json({ message: error.message });
  }
};

//Update Transport
const updateTransport = async (req, res) => {
  const { id } = req.params;
  const {
    busNO,
    dateTime,
    location,
    travelingRoot,
    startLocation,
    endLocation,
  } = req.body;

  try {
    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res.status(404).send(`No Transport Details with id: ${id}`);
    }

    const updatedTransport = {
      busNO,
      dateTime,
      location,
      travelingRoot,
      startLocation,
      endLocation,
      _id: id,
    };

    await Transport.findByIdAndUpdate(id, updatedTransport, { new: true });

    res.status(200);
    res.json(updatedTransport);
  } catch (error) {
    res.status(404);
    res.json({ message: error.message });
  }
};

//delete Transport
const deleteTransport = async (req, res) => {
  const { id } = req.params;

  try {
    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res.status(404).send(`No Transport Details with id: ${id}`);
    }

    await Transport.findByIdAndDelete(id);
    res.status(200);
    res.json({ message: "Transport Detail Deleted Successfully" });
  } catch (error) {
    res.status(404);
    res.json({ message: error.message });
  }
};

module.exports = {
  getTransport,
  createTransport,
  getTransport,
  getTransports,
  getTransportReport,
  updateTransport,
  deleteTransport,
};

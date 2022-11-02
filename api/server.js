const mongoose = require("mongoose");
const express = require("express");
const dotenv = require("dotenv");
const cors = require("cors");
const bodyParser = require("body-parser");

//import routes

const userRoutes = require("./routes/user.routes.js");
const JourneyRoutes = require("./routes/journey.routes.js");
const transportRoutes = require("./routes/transport.routes.js");

const app = express();
dotenv.config();

app.use(bodyParser.json({ limit: "30mb", extended: true }));
app.use(bodyParser.urlencoded({ limit: "30mb", extended: true }));
app.use(cors());

app.get("/", (req, res) => {
  res.json({ message: "Welcome to Farm Portal Server" });
});

// API routes
app.use("/ticketnow/api/v1/user", userRoutes);
app.use("/ticketnow/api/v1/journey", JourneyRoutes);
app.use("/ticketnow/api/v1/transport", transportRoutes);

const CONNECTION_URL = `mongodb+srv://${process.env.DB_USERNAME}:${process.env.DB_PASSWORD}@cluster0.pjvaggo.mongodb.net/?retryWrites=true&w=majority`;

const PORT = process.env.PORT || 5000;

mongoose
  .connect(CONNECTION_URL, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => {
    //  Comment below code when running tests
    // ---------------------------------------------
    app.listen(PORT, () => {
      console.log(`Server Running on port : ${PORT}`);
    });
    // ---------------------------------------------
  })
  .catch((error) => {
    // console.log(error.message);
  });

module.exports = app;

import bodyParser from "body-parser";
import cors from "cors";
import dotenv from "dotenv";
import express from "express";
import mongoose from "mongoose";

//import routes

import userRoutes from "./routes/user.routes.js";

const app = express();
dotenv.config();

app.use(bodyParser.json({ limit: "30mb", extended: true }));
app.use(bodyParser.urlencoded({ limit: "30mb", extended: true }));
app.use(cors());

app.get("/", (req, res) => {
  res.json({ message: "Welcome to Farm Portal Server" });
});

app.use("/ticketnow/api/v1/user", userRoutes);

const CONNECTION_URL = `mongodb+srv://${process.env.DB_USERNAME}:${process.env.DB_PASSWORD}@cluster0.pjvaggo.mongodb.net/?retryWrites=true&w=majority`;

const PORT = process.env.PORT || 5000;

mongoose
  .connect(CONNECTION_URL, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => {
    app.listen(PORT, () => console.log(`Server Running on port : ${PORT}`));
  })
  .catch((error) => {
    console.log(error.message);
  });

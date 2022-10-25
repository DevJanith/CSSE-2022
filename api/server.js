import bodyParser from "body-parser";
import cors from "cors";
import dotenv from "dotenv";
import express from "express";
import mongoose from "mongoose";

//import routes
// import feedbackRoutes from "./routes/feedback.routes.js";
// import itemRoutes from "./routes/item.routes.js";
// import tutorialRoutes from "./routes/tutorial.routes.js";
import userRoutes from "./routes/user.routes.js";
// import productRoutes from "./routes/product.routes.js";

const app = express();
dotenv.config();

app.use(bodyParser.json({ limit: "30mb", extended: true }));
app.use(bodyParser.urlencoded({ limit: "30mb", extended: true }));
app.use(cors());

app.get("/", (req, res) => {
  res.json({ message: "Welcome to Farm Portal Server" });
});

// app.use("/shop-house/tutorial", tutorialRoutes);
app.use("/ticketnow/api/v1/user", userRoutes);
// app.use("/shop-house/feedback", feedbackRoutes);
// app.use("/shop-house/item", itemRoutes);
// app.use("/shop-house/product", productRoutes);

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

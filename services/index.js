// Imports
const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const slotRoute = require("./routes/slot_routes");
const appointmentRoute = require("./routes/appointment_routes");

const app = express();

// Connect to database
const uri = "mongodb+srv://Sherif:sherif2001@cluster0.rcyuxj2.mongodb.net";
const port = 3000;

mongoose
  .connect(uri)
  .then(() => {
    console.log("Connected to MongoDB");
    app.listen(port, () => console.log("Server up and running"));
  })
  .catch((error) => {
    console.log(error);
  });

// Middleware
app.use(express.json());
app.use(cors());

// Routes
app.use("/api/slots", slotRoute);
app.use("/api/appointments", appointmentRoute);

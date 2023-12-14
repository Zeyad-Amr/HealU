// Imports
const express = require("express");
const mongoose = require("mongoose");
const slotRoute = require("./routes/slot_routes");
const appointmentRoute = require("./routes/appointment_routes");

const app = express();

// Connect to database
mongoose
  .connect(
    "mongodb+srv://Sherif:sherif2001@cluster0.rcyuxj2.mongodb.net/test?retryWrites=true&w=majority"
  )
  .then(() => {
    console.log("Connected to MongoDB");
    app.listen(3000, () => console.log("Server up and running"));
  })
  .catch((error) => {
    console.log(error);
  });

// Middleware
app.use(express.json());

app.use("/api/slots", slotRoute);
app.use("/api/appointments", appointmentRoute);

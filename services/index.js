// Imports
const express = require("express");
const mongoose = require("mongoose");
const slotRoute = require("./routes/slot_routes");
const appointmentRoute = require("./routes/appointment_routes");

const app = express();
var cors = require("cors");

app.use(cors()); // Use this after the variable declaration
// Connect to database
mongoose
  .connect(
    "mongodb+srv://Ahmed-ElSarta:vK7HvFSp4SnlAHep@cluster0.rcyuxj2.mongodb.net"
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

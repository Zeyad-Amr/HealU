const mongoose = require("mongoose");

const slotSchema = mongoose.Schema(
  {
    slotId: {
      type: Number,
      required: [true, "Please enter slot id"],
    },
    doctorId: {
      type: Number,
      required: [true, "Please enter doctor id"],
    },
    clinicId: {
      type: Number,
      required: [true, "Please enter clinic id"],
    },
    time: {
      type: String,
      required: [true, "Please enter the slot's time"],
    },
    date: {
      type: Date,
      required: [true, "Please enter the slot's date"],
    },
  },
  {
    timestamps: true,
  }
);

const Slot = mongoose.model("Slot", slotSchema);
module.exports = Slot;

const mongoose = require("mongoose");

const slotSchema = mongoose.Schema(
  {
    doctor_id: {
      type: String,
      required: [true, "Please enter doctor id"],
    },
    clinic_id: {
      type: String,
      required: [true, "Please enter clinic id"],
    },
    time: {
      type: String,
      required: [true, "Please enter the slot's time"],
    },
    date: {
      type: String,
      required: [true, "Please enter the slot's date"],
    },
  },
  {
    timestamps: true,
  }
);

const Slot = mongoose.model("Slot", slotSchema);
module.exports = Slot;

const mongoose = require("mongoose");

const slotSchema = mongoose.Schema(
    {
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
        weekDay: {
            type: String,
            required: [true, "Please enter the slot's week day"],
        },
    },
    {
        timestamps: true,
    }
);

const Slot = mongoose.model("Slot", slotSchema);
module.exports = Slot;

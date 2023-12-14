const Appointment = require("../models/Appointment");

const createAppointment = async (req, res, next) => {
  try {
    const appointment = await Appointment.create(req.body);
    res.status(200).json({ message: "Success" });
    next();
  } catch (error) {
    res.status(500).json({ message: error.message }) && next(error);
  }
};

// ================================================================================= //

const getAllAppointments = async (req, res, next) => {
  try {
    const appointments = await Appointment.find({});
    res.status(200).json(appointments);
    next();
    next();
  } catch (error) {
    res.status(500).json({ message: error.message }) && next(error);
  }
};
// ================================================================================= //

const getAppointmentByPatientID = async (req, res, next) => {
  try {
    const { patientID } = req.params;
    const appointment = await Appointment.find({ patient_id: patientID });
    res.status(200).json(appointment);
    next();
  } catch (error) {
    res.status(500).json({ message: error.message }) && next(error);
  }
};

// ================================================================================= //

const getAppointmentByDoctorID = async (req, res, next) => {
  try {
    const { doctorID } = req.params;
    const appointment = await Appointment.find({ doctor_id: doctorID });
    res.status(200).json(appointment);
    next();
  } catch (error) {
    res.status(500).json({ message: error.message }) && next(error);
  }
};

// ================================================================================= //

const getAppointmentByClinicID = async (req, res, next) => {
  try {
    const { clinicID } = req.params;
    const appointment = await Appointment.find({ clinic_id: clinicID });
    res.status(200).json(appointment);
    next();
  } catch (error) {
    res.status(500).json({ message: error.message }) && next(error);
  }
};
// ================================================================================= //

const updateAppointment = async (req, res, next) => {
  try {
    const { patientID, slotID } = req.params;
    const appointment = await Appointment.findOneAndUpdate(
      { slot_id: slotID, patient_id: patientID },
      req.body
    );
    if (!appointment) {
      return res
        .status(404)
        .json({ message: `No Appointment with Slot ID: ${slotID}` });
    }
    res.status(200).json({ message: "Success" });
    next();
  } catch (error) {
    res.status(500).json({ message: error.message }) && next(error);
  }
};
// ================================================================================= //

const deleteAppointment = async (req, res, next) => {
  try {
    const { patientID, slotID } = req.params;
    const appointment = await Appointment.findOneAndDelete(
      { slot_id: slotID, patient_id: patientID },
      req.body
    );
    if (!appointment) {
      return res.status(404).json({
        message: `No Appointemnt with Slot ID: ${slotID}`,
      });
    }
    res
      .status(200)
      .json({ message: `Deleted an appointment with Slot ID: ${slotID}` });
    next();
  } catch (error) {
    res.status(500).json({ message: error.message }) && next(error);
  }
};

module.exports = {
  createAppointment,
  getAllAppointments,
  getAppointmentByPatientID,
  getAppointmentByDoctorID,
  getAppointmentByClinicID,
  updateAppointment,
  deleteAppointment,
};

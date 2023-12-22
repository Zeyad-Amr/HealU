const Appointment = require("../models/Appointment");
const Slot = require("../models/Slot");

const createAppointment = async (req, res, next) => {
  try {
    const slotId = req.params.slotId;
    const patientId = req.params.patientId;

    await Slot.findOne({ slotId: slotId }).then((slot) => {
      Appointment.create({
        appointmentId: slotId,
        patientId: patientId,
        doctorId: slot.doctorId,
        clinicId: slot.clinicId,
        date: slot.date,
        time: slot.time,
        status: "Booked",
      });
    });

    res.status(200).json({ message: "Success" });

    await Slot.findOneAndDelete({ slotId: slotId });

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
  } catch (error) {
    res.status(500).json({ message: error.message }) && next(error);
  }
};

const getAppointmentByID = async (req, res, next) => {
  try {
    const { appointmentId } = req.params;
    const appointment = await Appointment.findOne({ appointmentId: appointmentId });
    res.status(200).json(appointment);
    next();
  } catch (error) {
    res.status(500).json({ message: error.message }) && next(error);
  }
};
// ================================================================================= //

const getAppointmentByPatientID = async (req, res, next) => {
  try {
    const { patientId } = req.params;
    const appointment = await Appointment.find({ patientId: patientId });

    if (appointment)
      res.status(200).json(appointment);
    else
      res.status(404).json({ message: `No Appointments with Patient ID: ${patientId}` });

    next();
  } catch (error) {
    res.status(500).json({ message: error.message }) && next(error);
  }
};

// ================================================================================= //

const getAppointmentByDoctorID = async (req, res, next) => {
  try {
    const { doctorId } = req.params;
    const appointment = await Appointment.find({ doctorId: doctorId });

    if(appointment.length > 0)
      res.status(200).json(appointment);
    else
      res.status(404).json({ message: `No Appointments with Doctor ID: ${doctorId}` });

    next();
  } catch (error) {
    res.status(500).json({ message: error.message }) && next(error);
  }
};

// ================================================================================= //

const getAppointmentByClinicID = async (req, res, next) => {
  try {
    const { clinicId } = req.params;
    const appointment = await Appointment.find({ clinicId: clinicId });

    if(appointment.length > 0)
      res.status(200).json(appointment);
    else
      res.status(404).json({ message: `No Appointments with Clinic ID: ${clinicId}` });

    next();
  } catch (error) {
    res.status(500).json({ message: error.message }) && next(error);
  }
};
// ================================================================================= //

const updateAppointment = async (req, res, next) => {
  try {
    const {appointmentId } = req.params;
    const appointment = await Appointment.findOneAndUpdate(
      {appointmentId: appointmentId},
      req.body
    );

    if (appointment)
      res.status(200).json({ message: "Success"});
    else
      res.status(404).json({ message: `No Appointment found for the given appointmentId`});

    next();
  } catch (error) {
    res.status(500).json({ message: error.message }) && next(error);
  }
};
// ================================================================================= //

const cancelAppointment = async (req, res, next) => {
  try {
    const { appointmentId } = req.params;
    
    Appointment.findOne({ appointmentId: appointmentId }).then((appointment) => {
      Slot.create({
        slotId: appointmentId,
        doctorId: appointment.doctorId,
        clinicId: appointment.clinicId,
        time: appointment.time,
        date: appointment.date,
      })
    });

    const appointment = await Appointment.findOneAndDelete(
      { appointmentId: appointmentId}
    );

    if(appointment)
      res.status(200).json({ message: `Canceled an appointment with Appointment ID: ${appointmentId}` });
    else
      res.status(404).json({ message: `No Appointment with Appointment ID: ${appointmentId}` });

    next();
  } catch (error) {
    res.status(500).json({ message: error.message }) && next(error);
  }
};

module.exports = {
  createAppointment,
  getAllAppointments,
  getAppointmentByID,
  getAppointmentByPatientID,
  getAppointmentByDoctorID,
  getAppointmentByClinicID,
  updateAppointment,
  cancelAppointment,
};

import { Box, Modal, Typography } from "@mui/material";
import React from "react";
import { Appointment } from "../../state/slices/appointmentSlice";
import dayjs from "dayjs";

interface AppointmentModalProps {
  selectedAppointment?: Appointment;
  handleCloseModal: () => void;
}

const AppointmentModal: React.FC<AppointmentModalProps> = ({
  selectedAppointment,
  handleCloseModal,
}) => {
  return (
    <>
      <Modal open={Boolean(selectedAppointment)} onClose={handleCloseModal}>
        <Box
          sx={{
            position: "absolute",
            top: "50%",
            left: "50%",
            transform: "translate(-50%, -50%)",
            bgcolor: "background.paper",
            boxShadow: 24,
            p: 4,
            borderRadius: "8px",
          }}
        >
          <Typography variant="h6" component="div">
            Appointment Details
          </Typography>
          <Typography variant="body1" style={{ marginTop: "8px" }}>
            Patient ID: {selectedAppointment?.patientId}
          </Typography>
          <Typography variant="body1" style={{ marginTop: "8px" }}>
            Clinic ID: {selectedAppointment?.clinicId}
          </Typography>
          <Typography variant="body1" style={{ marginTop: "8px" }}>
            Time: {selectedAppointment?.time}
          </Typography>
          <Typography variant="body1" style={{ marginTop: "8px" }}>
            Date: {dayjs(selectedAppointment?.date).format("dddd YYYY-MM-DD")}
          </Typography>
          <Typography variant="body1" style={{ marginTop: "8px" }}>
            {/* Add more patient details as needed */}
          </Typography>
        </Box>
      </Modal>
    </>
  );
};

export default AppointmentModal;

import * as React from "react";
import { StyledEngineProvider } from "@mui/material/styles";
import DoctorAppointments from "../components/appointmentSlots/appointmentsTable";
const Appointments = () => {
  return (
    <>
      <React.StrictMode>
        <StyledEngineProvider injectFirst>
          <DoctorAppointments />
        </StyledEngineProvider>
      </React.StrictMode>
    </>
  );
};

export default Appointments;

import { Box } from "@mui/material";
import React from "react";
import PageBody from "../../../../core/components/PageBody";
import Appointments from "../../components/appointments-slots/Appointments";
import HeaderComponent from "../../components/header";

const AppointmentsPage = () => {
  return (
    <Box
      sx={{
        width: "100%",
        height: "100%",
        backgroundColor: "#EEEFFF",
      }}
    >
      <HeaderComponent />
      <PageBody>
        <Appointments />
      </PageBody>
    </Box>
  );
};

export default AppointmentsPage;

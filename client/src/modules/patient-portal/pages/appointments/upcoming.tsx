import { Box } from "@mui/material";
import HeaderComponent from "../../components/header";
import PageBody from "../../../../core/components/PageBody";
import UpcomingAppointmentsComponent from "../../components/appointments/UpcomingAppointments";

const UpcomingAppointments = () => {
  return (
    <Box
      sx={{
        width: "100vw",
        height: "100vh",
        backgroundColor: "#EEEFFF",
        overflowX: "hidden",
        overflowY: "auto",
      }}
    >
      <HeaderComponent />
      <PageBody>
        <UpcomingAppointmentsComponent />
      </PageBody>
    </Box>
  );
};

export default UpcomingAppointments;
import { Box } from "@mui/material";
import HeaderComponent from "../../components/header";
import PageBody from "../../../../core/components/PageBody";
import PreviousAppointmentsComponent from "../../components/appointments/PreviousAppointments";

const PerviousAppointments = () => {
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
        <PreviousAppointmentsComponent />
      </PageBody>
    </Box>
  );
};

export default PerviousAppointments;

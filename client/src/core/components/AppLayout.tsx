import { Box } from "@mui/material";
import HeaderComponent from "../../modules/patient-portal/components/header";
import PageBody from "./PageBody";

const AppLayout = ({ children }: { children: React.ReactNode }) => {
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
      <PageBody>{children}</PageBody>
    </Box>
  );
};

export default AppLayout;

import { Typography, Button, Container, Box } from "@mui/material";
import AddCircleOutlineOutlinedIcon from "@mui/icons-material/AddCircleOutlineOutlined";
import { useEffect, useState } from "react";
import ServicesTable from "../components/servicesTable";
import CreateServicePopup from "../components/createServicePopup";
import api from "../../../core/api/api";

const Services = () => {
  useEffect(() => {
    getAllServices();
  }, []);
  const [rows, setRows] = useState([]);
  const [isAddDialogOpen, openDialog] = useState(false);
  const handleAddService = () => {
    openDialog(true);
  };
  const handleCloseDialogs = () => {
    openDialog(false);
  };
  const getAllServices = () => {
    api
      .get("/admin/clinic-service")
      .then((response) => setRows(response.data.data.clinicServices));
  };
  window.addEventListener("onreload", getAllServices);

  return (
    <>
      <Container>
        <Box sx={{ display: "flex", justifyContent: "center" }}>
          <Typography
            gutterBottom
            variant="h1"
            color="textSecondary"
            align="center"
          >
            Clinic Services
          </Typography>
        </Box>

        <br></br>

        <Box
          sx={{
            display: "flex",
            justifyContent: "flex-end",
            flexDirection: "column",
            alignItems: "flex-end",
          }}
        >
          <Button
            onClick={handleAddService}
            variant="contained"
            color="primary"
            sx={{
              borderRadius: "15px",
              background:
                "linear-gradient(285deg, #01B6B6 10.66%, #13D2DE 102.7%)",
              color: "#FFF",
              width: "200px",
              height: "52px",
            }}
            startIcon={<AddCircleOutlineOutlinedIcon />}
          >
            Create New Service
          </Button>
        </Box>

        <br></br>
        <Box
          sx={{
            display: "flex",
            justifyContent: "center",
            flexDirection: "column",
            alignItems: "center",
          }}
        >
          <ServicesTable rows={rows} />
        </Box>
      </Container>
      <CreateServicePopup
        isAddDialogOpen={isAddDialogOpen}
        handleCloseDialogs={handleCloseDialogs}
      ></CreateServicePopup>
    </>
  );
};
export default Services;

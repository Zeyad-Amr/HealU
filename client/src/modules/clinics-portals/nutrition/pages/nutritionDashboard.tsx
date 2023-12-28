import React, { useState } from "react";
// import React from "react";
import { Grid } from "@mui/material";
import { styled, Theme } from "@mui/material/styles";
import { Container } from "@mui/material";
import { theme } from "../../../../../src/core/theme/theme";
import PatientData from "../components/PatientData";
import History from "../components/history";
import CustomContainer from "../components/dietPlan";
import ListPrescription from "../components/list";
import Add from "../components/Add";
import Button from "../components/Button";
import PrescriptionModal from "../components/modal";

const ContainerWrapper = styled("div")(({ theme }: { theme: Theme }) => ({
  marginTop: "10px",
  display: "flex",
  justifyContent: "center",
}));

const ContentWrapper = styled("div")({
  // marginTop: "10px",
});

const NutritionDashBoard = () => {
  const prescription = {
    drug: "Loratadine",
    dosage: "10 MG",
  };

  const [openModal, setOpenModal] = useState(false);

  const handleOpenModal = () => {
    setOpenModal(true);
  };

  const handleCloseModal = () => {
    setOpenModal(false);
  };

  return (
    <ContainerWrapper>
      <ContentWrapper>
        <Grid container spacing={13}>
          <Grid item>
            <PatientData name="John Doe" weight={70} length={175} age={30} />
          </Grid>
          <Grid item>
            <History />
          </Grid>
          <Grid item>
            <CustomContainer />
            <Grid container spacing={2}>
              <Grid item>
                <Add title="Prescription" />
              </Grid>
              <Grid item>
                <Add title="Diet Plan" />
              </Grid>
              <Grid item>
                <Add title="Tests" />
              </Grid>
            </Grid>

            <Grid container spacing={2}>
              <Grid item>
                <ListPrescription />
              </Grid>
              <Grid item>{/* <ListPrescription /> */}</Grid>
              <Grid item>{/* <ListPrescription /> */}</Grid>
            </Grid>
            {/* <ListPrescription /> */}
          </Grid>
        </Grid>

        <Grid container spacing={2}>
          <Grid item>
            <Button label="Done" onClick={handleOpenModal} />
            <div>
              <PrescriptionModal onClose={handleCloseModal} />
            </div>
          </Grid>
        </Grid>
      </ContentWrapper>
    </ContainerWrapper>
  );
};

export default NutritionDashBoard;

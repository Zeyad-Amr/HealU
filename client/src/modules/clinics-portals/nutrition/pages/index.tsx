import React from "react";
import { styled, Theme } from "@mui/material/styles";
import NutritionDashBoard from "../pages/nutritionDashboard";
import PrescriptionModal from "../components/modal";

const ContainerWrapper = styled("div")(({ theme }: { theme: Theme }) => ({
  marginTop: "10px",
  display: "flex",
  justifyContent: "center",
}));

const ContentWrapper = styled("div")({
  // marginTop: "10px",
});

const NutritionClinicPortal = () => {
  const handleCloseModal = () => {
    // setOpenModal(false);
  };

  return (
    <ContainerWrapper>
      <ContentWrapper>
        <NutritionDashBoard />
        {/* <PrescriptionModal onClose={handleCloseModal} /> */}
      </ContentWrapper>
    </ContainerWrapper>
  );
};

export default NutritionClinicPortal;

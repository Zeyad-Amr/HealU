import React from "react";
import { styled, Theme } from "@mui/material/styles";
import NutritionDashBoard from "../pages/nutritionDashboard";

const ContainerWrapper = styled("div")(({ theme }: { theme: Theme }) => ({
  marginTop: "10px",
  display: "flex",
  justifyContent: "center",
}));

const ContentWrapper = styled("div")({});

const NutritionClinicPortal = () => {
  return (
    <ContainerWrapper>
      <ContentWrapper>
        <NutritionDashBoard />
      </ContentWrapper>
    </ContainerWrapper>
  );
};

export default NutritionClinicPortal;

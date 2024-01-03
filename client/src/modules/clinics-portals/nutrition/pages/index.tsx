import React from "react";
import { styled, Theme } from "@mui/material/styles";
import Appointments from "../pages/Appointments";
import NutritionDashBoard from "../pages/nutritionDashboard";

const ContainerWrapper = styled("div")(({ theme }: { theme: Theme }) => ({
  display: "flex",
  justifyContent: "center",
}));

const ContentWrapper = styled("div")({});

const NutritionClinicPortal = () => {
    return (
        <ContainerWrapper>
            <ContentWrapper>
                <Appointments/>
                {/*<NutritionDashBoard />*/}
            </ContentWrapper>
        </ContainerWrapper>
    );
};

export default NutritionClinicPortal;

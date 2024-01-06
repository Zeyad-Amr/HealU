import React from "react";
import { styled, Theme } from "@mui/material/styles";
import Appointments from "../pages/Appointments";
import NutritionDashBoard from "../pages/nutritionDashboard";
import AppLayout from "../../../../core/components/AppLayout";

const ContainerWrapper = styled("div")(({ theme }: { theme: Theme }) => ({
  display: "flex",
  justifyContent: "center",
}));

const ContentWrapper = styled("div")({});

const NutritionClinicPortal = () => {
    return (
        <AppLayout>
            <ContainerWrapper>
                <ContentWrapper>
                    <Appointments/>
                </ContentWrapper>
            </ContainerWrapper>
        </AppLayout>
    );

};

export default NutritionClinicPortal;

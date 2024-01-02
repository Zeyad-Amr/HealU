import React from "react";
import {styled, Theme} from "@mui/material/styles";
import Appointments from "./Appointments";

const ContainerWrapper = styled("div")(({theme}: { theme: Theme }) => ({
    display: "flex",
    justifyContent: "center",
    width: "100%",
}));

const ContentWrapper = styled("div")({});

const NutritionClinicPortal = () => {
    return (
        <ContainerWrapper>
            <ContentWrapper>
                <Appointments/>
            </ContentWrapper>
        </ContainerWrapper>
    );
};

export default NutritionClinicPortal;

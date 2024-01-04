import React, {useState} from "react";
import {Grid} from "@mui/material";
import {styled, Theme} from "@mui/material/styles";
import PatientData from "../components/PatientData";
import History from "../components/history";
import DietInfo from "../components/dietInfo";
import List from "../components/list";
import Add from "../components/Add";
import Button from "../components/Button";
import LowerComponent from "../components/LowerComponent";
import Prescription from "../components/LowerComponets/Prescription";
import Tests from "../components/LowerComponets/Tests";
import DietPlan from "../components/LowerComponets/DietPlan";
import Services from "../components/LowerComponets/Services";

const ContainerWrapper = styled("div")(({theme}: { theme: Theme }) => ({
    display: "flex",
    justifyContent: "center",
    // backgroundColor: "#9a1111",
    width: "100%",
    paddingX: "4rem",
    overflowX: "hidden",
}));

const ContentWrapper = styled("div")({
    width: "100%",
});

const NutritionDashBoard = () => {
    const [openModal, setOpenModal] = useState(false);

    const handleOpenModal = () => {
        setOpenModal(true);
    };

    const additionalComponents = [
        {
            component: <Add title="Prescription" modalType="prescription"/>,
            key: "prescription",
        },
        {
            component: <Add title="Diet Plan" modalType="dietPlan"/>,
            key: "dietPlan",
        },
        {component: <Add title="Tests" modalType="test"/>, key: "tests"},
        {
            component: <Add title="Services" modalType="services"/>,
            key: "services",
        },
    ];
    const listComponents = [
        {
            modalType: "prescription" as const,
            title: "Vitamin D3",
            Content1: "250 mcg",
            Content2: "Once A Week",
        },
        {
            modalType: "dietPlan" as const,
            Content1: "BreakFast",
            Content2: "Lunch",
        },
        {
            modalType: "test" as const,
            Content1: "CBC",
            Content2: "Vitamin D",
        },
        {
            modalType: "service" as const,
            Content1: "New Appointment",
            Content2: "Follow-up Appointment",
        },
    ];

    return (
        <ContainerWrapper>
            <ContentWrapper>
                <Grid container sx={{
                    display: "flex",
                    flexDirection: "column",
                }}>

                    <Grid item sx={{
                        display: "flex",
                        justifyContent: "space-between",
                        marginBottom: "1rem",
                    }}
                    >
                        <Grid item sx={{width: "40%"}}>
                            <PatientData />
                        </Grid>
                        <Grid item sx={{width: "59%"}}>
                            <History/>
                        </Grid>
                    </Grid>

                    <Grid item sx={{
                        display: "flex",
                        marginBottom: "1rem",
                    }}>
                        <DietInfo/>
                    </Grid>

                    <Grid item>
                        <Grid container sx={{display: 'flex', justifyContent: 'space-between', marginBottom: "1rem"}}>
                            <Grid item sx={{width: '24%'}}>
                                <Prescription/>
                            </Grid>
                            <Grid item sx={{width: '24%'}}>
                                <Tests/>
                            </Grid>
                            <Grid item sx={{width: '24%'}}>
                                <DietPlan/>
                            </Grid>
                            <Grid item sx={{width: '24%'}}>
                                <Services/>
                            </Grid>
                        </Grid>
                    </Grid>

                    <Grid container spacing={2} sx={{
                        display: "flex",
                        justifyContent: "end",
                    }}>
                        <Grid item sx={{display: 'flex', justifyContent: 'space-between', width: '20%'}}>
                            <Button label="Pay" onClick={handleOpenModal}/>
                            <Button label="Submit" onClick={handleOpenModal}/>
                        </Grid>
                    </Grid>

                </Grid>

            </ContentWrapper>
        </ContainerWrapper>
    );
};

export default NutritionDashBoard;

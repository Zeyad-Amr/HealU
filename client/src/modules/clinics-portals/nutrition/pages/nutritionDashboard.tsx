import React, { useState } from "react";
import { Grid } from "@mui/material";
import { styled, Theme } from "@mui/material/styles";
import PatientData from "../components/PatientData";
import History from "../components/history";
import DietInfo from "../components/dietInfo";
import List from "../components/list";
import Add from "../components/Add";
import Button from "../components/Button";

const ContainerWrapper = styled("div")(({ theme }: { theme: Theme }) => ({
  marginTop: "10px",
  display: "flex",
  justifyContent: "center",
  marginLeft: "80px",
}));

const ContentWrapper = styled("div")({});

const NutritionDashBoard = () => {
  const [openModal, setOpenModal] = useState(false);

  const handleOpenModal = () => {
    setOpenModal(true);
  };

  const additionalComponents = [
    {
      component: <Add title="Prescription" modalType="prescription" />,
      key: "prescription",
    },
    {
      component: <Add title="Diet Plan" modalType="dietPlan" />,
      key: "dietPlan",
    },
    { component: <Add title="Tests" modalType="test" />, key: "tests" },
    {
      component: <Add title="Services" modalType="services" />,
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
        <Grid container spacing={13}>
          <Grid item>
            <PatientData name="Mohamed Aly" weight={70} length={175} age={30} />
          </Grid>
          <Grid item>
            <History />
          </Grid>
          <Grid item>
            <DietInfo />
            <Grid container spacing={2}>
              {additionalComponents.map((componentData) => (
                <Grid item key={componentData.key}>
                  {componentData.component}
                </Grid>
              ))}
            </Grid>

            <Grid container spacing={2}>
              {listComponents.map((listData, index) => (
                <Grid item key={index}>
                  <List
                    modalType={listData.modalType}
                    title={listData.title}
                    Content1={listData.Content1}
                    Content2={listData.Content2} 
                  />
                </Grid>
              ))}
            </Grid>
          </Grid>
        </Grid>

        <Grid container spacing={2}>
          <Grid item>
            <Button label="Done" onClick={handleOpenModal} />
          </Grid>
        </Grid>
      </ContentWrapper>
    </ContainerWrapper>
  );
};

export default NutritionDashBoard;

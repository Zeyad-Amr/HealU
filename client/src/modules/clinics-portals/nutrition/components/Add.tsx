import React, { useState } from "react";
import { styled, Theme } from "@mui/material/styles";
import { Typography, Grid, IconButton } from "@mui/material";
import AddIcon from "@mui/icons-material/Add";
// import PrescriptionModal from "./modal";
// import DietPlanModal from "./DietPlanModal";
// import TestModal from "./testModal";
import Modal from "./ModalTrial";
import Dropdown from "./dropDown";
// import TModal from "./Tmodal";
import MultiSelect from "./multiSelect";

interface AddProps {
  title: string;
  modalType: "prescription" | "dietPlan" | "test";
}

const LabelWrapper = styled("label")(({ theme }: { theme: Theme }) => ({
  display: "flex",
  flexDirection: "column",
  marginBottom: "10px",
  color: "#757575",
}));
const prescriptionField = [
  { label: "Drug Name", name: "drugName" },
  { label: "Dose", name: "dose" },
  { label: "Notes", name: "notes" },
];

const initialPrescriptionData = {
  drugName: "Cometrex",
  dose: "30 ML",
  notes: "Test",
  saveTime: "After Breakfast",
};

const dietFields = [
  { label: "Breakfast", name: "breakfast" },
  { label: "Lunch", name: "lunch" },
  { label: "Dinner", name: "dinner" },
  { label: "Snacks", name: "snacks" },
];

const initialDietData = {
  breakfast: "Brown Toast with low fat cheese",
  lunch: "Seafood",
  dinner: "Youghurt",
  snacks: "Apple",
};

const testAdditionalElements = [
  <>
    <LabelWrapper>Test Name</LabelWrapper>
    <Dropdown />
  </>,
];

const prescriptionAdditionalElements = [
  <>
    <LabelWrapper>
      Time
      <MultiSelect />
    </LabelWrapper>
  </>,
];

// const testFields = [{ label: "Test Name", name: "testName" }];
// const initialTestData = { testName: "" };

const Container = styled("div")(({ theme }: { theme: Theme }) => ({
  display: "flex",
  flexDirection: "column",
  alignItems: "center",
  width: "100%",
  maxWidth: "500px",
  marginLeft: "38px",
  boxSizing: "border-box",
}));

const Card = styled("div")(({ theme }: { theme: Theme }) => ({
  backgroundColor: "#BDBDBD",
  borderRadius: "10px",
  padding: theme.spacing(1),
  boxSizing: "border-box",
  width: "424px",
}));

const Title = styled(Typography)(({ theme }: { theme: Theme }) => ({
  fontSize: "24px",
  fontWeight: "bold",
  color: "#333333",
  marginBottom: theme.spacing(1),
  width: "50%",
}));

const Add: React.FC<AddProps> = ({ title, modalType }) => {
  const [openModal, setOpenModal] = useState(false);
  const [cardVisible, setCardVisible] = useState(false);

  const handleOpenModal = () => {
    setOpenModal(true);
  };

  const handleCloseModal = () => {
    setOpenModal(false);
  };

  const handleShowCard = () => {
    setCardVisible(true);
  };

  const renderModal = () => {
    switch (modalType) {
      case "prescription":
        return (
          // <PrescriptionModal
          //   onClose={handleCloseModal}
          //   handleShowCard={handleShowCard}
          // />
          <Modal
            onClose={handleCloseModal}
            handleShowCard={handleShowCard}
            additionalElements={prescriptionAdditionalElements}
            modals={prescriptionField}
            initialData={initialPrescriptionData}
            modalTitle="Prescription"
          />
        );
      case "dietPlan":
        return (
          <Modal
            onClose={handleCloseModal}
            handleShowCard={handleShowCard}
            modals={dietFields}
            initialData={initialDietData}
            modalTitle="Diet Plan"
          />
        );
      case "test":
        return (
          // <TestModal
          //   onClose={handleCloseModal}
          //   handleShowCard={handleShowCard}
          // />
          <Modal
            onClose={handleCloseModal}
            handleShowCard={handleShowCard}
            additionalElements={testAdditionalElements}
            // modals={testFields}
            // initialData={initialTestData}
            modalTitle="Tests"
          />
        );
      default:
        return null;
    }
  };

  return (
    <Container>
      <Card>
        <Grid item>
          <Title>{title}</Title>
        </Grid>
        <Grid item>
          {/* <Icon
//             sx={{
//               fontSize: 30,
//               color: "#BDBDBD",
//               backgroundColor: "#000",
//               borderRadius: "50%",
//               marginLeft: "8px",
//             }}
//           >
//             add_circle
//           </Icon> */}
          <IconButton sx={{ color: "black" }} onClick={handleOpenModal}>
            <AddIcon />
          </IconButton>
          {openModal && renderModal()}
        </Grid>
      </Card>
    </Container>
  );
};

export default Add;

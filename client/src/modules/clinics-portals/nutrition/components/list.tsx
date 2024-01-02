import React, { useState } from "react";
import { styled, Theme } from "@mui/material/styles";
import { Typography } from "@mui/material";
import EditIcon from "@mui/icons-material/Edit";
import MultiSelect from "./multiSelect";
import Modal from "./ModalTrial";
import Dropdown from "./dropDown";

interface ListProps {
  modalType: "prescription" | "dietPlan" | "test";
  title?: string;
  Content1: string;
  Content2: string;
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

const Container = styled("div")(({ visible }: { visible: boolean }) => ({
  display: "flex",
  flexDirection: "column",
  alignItems: "center",
  width: "100%",
  maxWidth: "500px",
  margin: "0 auto",
  boxSizing: "border-box",
  marginLeft: "10px",
}));
const IconButton = styled("div")({
  backgroundColor: "transparent",
  border: "none",
  cursor: "pointer",
  marginLeft: "390px",
  marginTop: "10px",
});

const Card = styled("div")(({ theme }: { theme: Theme }) => ({
  backgroundColor: "#ffffff",
  marginLeft: "40px",
  marginTop: "-24px",
  borderBottomLeftRadius: "10px",
  borderBottomRightRadius: "10px",
  boxShadow: "0 2px 5px rgba(0, 0, 0, 0.1)",
  width: "424px",
  padding: theme.spacing(1),
  boxSizing: "border-box",
}));

const Title = styled(Typography)(({ theme }: { theme: Theme }) => ({
  fontSize: "24px",
  fontWeight: "bold",
  color: "#333333",
  marginBottom: theme.spacing(1),
  marginLeft: "27px",
  marginTop: "-10px",
}));

const Content = styled(Typography)(({ theme }: { theme: Theme }) => ({
  fontSize: "16px",
  color: "#333333",
  marginBottom: theme.spacing(2),
  marginLeft: "27px",
}));

const List: React.FC<ListProps> = ({
  modalType,
  title,
  Content1,
  Content2,
}) => {
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
          <Modal
            onClose={handleCloseModal}
            handleShowCard={handleShowCard}
            additionalElements={testAdditionalElements}
            modalTitle="Tests"
          />
        );
      default:
        return null;
    }
  };

  return (
    <>
      {/* {cardVisible && ( */}
      <Container visible={cardVisible}>
        <Card>
          <IconButton aria-label="edit" onClick={handleOpenModal}>
            <EditIcon fontSize="medium" />
          </IconButton>
          {openModal && renderModal()}
          <Title>{title} </Title>
          <Content>{Content1}</Content>
          <Content>{Content2}</Content>
        </Card>
      </Container>
      {/* )} */}
    </>
  );
};

export default List;

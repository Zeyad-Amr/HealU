import React, { useState } from "react";
import { styled, Theme } from "@mui/material/styles";
import { Typography, TextField, Button } from "@mui/material";
import EditIcon from "@mui/icons-material/Edit";
import MultiSelect from "./multiSelect";
import Modal from "./modal";
import Dropdown from "./dropDown";


interface ListProps {
  modalType: "prescription" | "dietPlan" | "test" | "service";
  title?: string;
  Content1: string;
  Content2: string;
}

const Tests = [
  { value: "CBC", label: "CBC Test" },
  { value: "Vitamin-D", label: "Vitamin-D Test" },
];

const Services = [
  { value: "New Appointment", label: "New Appointment" },
  { value: "Follow-up Appointment", label: "Follow-up Appointment" },
];

const prescriptionField = [
  { label: "Drug Name", name: "drugName" },
  { label: "Dose", name: "dose" },
  { label: "Notes", name: "notes" },
];

const initialPrescriptionData: { [key: string]: string } = {
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

const initialDietData: { [key: string]: string } = {
  breakfast: "Brown Toast with low fat cheese",
  lunch: "Seafood",
  dinner: "Youghurt",
  snacks: "Apple",
};
const LabelWrapper = styled("label")(({ theme }: { theme: Theme }) => ({
  display: "flex",
  flexDirection: "column",
  marginBottom: "10px",
  color: "#757575",
}));

const Container = styled("div")(({ visible }: { visible: boolean }) => ({
  display: "flex",
  flexDirection: "column",
  alignItems: "center",
  width: "100%",
  maxWidth: "500px",
  justifyContent: "space-between",
  boxSizing: "border-box",
}));
const IconButton = styled("div")({
  backgroundColor: "transparent",
  border: "none",
  cursor: "pointer",
  marginLeft: "260px",
  marginTop: "10px",
});

const Card = styled("div")(({ theme }: { theme: Theme }) => ({
  backgroundColor: "#ffffff",
  marginLeft: "57px",
  marginRight: "-19px",
  marginTop: "-5px",
  borderBottomLeftRadius: "10px",
  borderBottomRightRadius: "10px",
  boxShadow: "0 2px 5px rgba(0, 0, 0, 0.1)",
  width: "304px",
  padding: theme.spacing(1),
  boxSizing: "border-box",
}));

const StyledButton = styled(Button)(({ theme }: { theme: Theme }) => ({
  alignSelf: "center",
  marginTop: "20px",
  marginBottom: "5px",
  width: "150px",
  fontFamily: theme.typography.fontFamily,
  fontSize: 16,
  fontWeight: "bold",
  color: "#fff",
  backgroundImage:
    "linear-gradient(90deg, hsla(183, 85%, 47%, 1) 0%, hsla(180, 99%, 36%, 1) 100%)",
  border: "none",
  borderRadius: "10px",
  padding: "12px 24px",
  cursor: "pointer",
  textAlign: "center",
  textDecoration: "none",
  transition: "background-color 0.3s ease",
  "&:hover": {
    backgroundColor: "#0056b3",
  },
  "&:active": {
    backgroundColor: "#004085",
    transform: "translateY(4px)",
  },
}));
const InputWrapper = styled(TextField)(({ theme }: { theme: Theme }) => ({
  marginTop: "5px",
  "& .MuiOutlinedInput-root": {
    "& fieldset": {
      border: "none",
    },
  },
  backgroundColor: "#F5F5F5",
  borderRadius: "10px",
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
            modalTitle="Prescription"
          >
            {prescriptionField.map((field) => (
              <LabelWrapper key={field.name}>
                {field.label}
                <InputWrapper
                  type="text"
                  name={field.name}
                  defaultValue={initialPrescriptionData[field.name]}
                  variant="outlined"
                />
              </LabelWrapper>
            ))}
            <LabelWrapper>
              Time
              <MultiSelect />
            </LabelWrapper>

            <StyledButton type="submit" onClick={handleShowCard}>
              Save
            </StyledButton>
          </Modal>
        );
      case "dietPlan":
        return (
          <Modal
            onClose={handleCloseModal}
            handleShowCard={handleShowCard}
            modalTitle="Diet Plan"
          >
            {dietFields.map((field) => (
              <LabelWrapper key={field.name}>
                {field.label}
                <InputWrapper
                  type="text"
                  name={field.name}
                  defaultValue={initialDietData[field.name]}
                  variant="outlined"
                />
              </LabelWrapper>
            ))}
            <StyledButton type="submit" onClick={handleShowCard}>
              Save
            </StyledButton>
          </Modal>
        );
        case "test":
          return (
            <Modal
              onClose={handleCloseModal}
              handleShowCard={handleShowCard}
              modalTitle="Tests"
            >
            <Dropdown options={Tests} />
  
              <StyledButton type="submit" onClick={handleShowCard}>
                Save
              </StyledButton>
            </Modal>
          );
          case "service":
          return (
            <Modal
              onClose={handleCloseModal}
              handleShowCard={handleShowCard}
              modalTitle="Services"
            >
            <Dropdown options={Services} />

              <StyledButton type="submit" onClick={handleShowCard}>
                Save
              </StyledButton>
            </Modal>
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

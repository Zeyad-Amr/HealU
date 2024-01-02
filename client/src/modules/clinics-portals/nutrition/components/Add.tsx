import React, { useState } from "react";
import { styled, Theme } from "@mui/material/styles";
import { Typography, Grid, IconButton, TextField, Button } from "@mui/material";
import AddIcon from "@mui/icons-material/Add";
import Dropdown from "./dropDown";
import MultiSelect from "./multiSelect";
import Modal from "./modal";

interface AddProps {
  title: string;
  modalType: "prescription" | "dietPlan" | "test" | "services";
}

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

const LabelWrapper = styled("label")(({ theme }: { theme: Theme }) => ({
  display: "flex",
  flexDirection: "column",
  marginBottom: "10px",
  color: "#757575",
}));
const Box = styled("div")(({ theme }: { theme: Theme }) => ({}));

const Container = styled("div")(({ theme }: { theme: Theme }) => ({
  display: "flex",
  flexDirection: "column",
  alignItems: "center",
  width: "100%",
  maxWidth: "500px",
  marginLeft: "38px",
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

const Card = styled("div")(({ theme }: { theme: Theme }) => ({
  backgroundColor: "#BDBDBD",
  borderRadius: "10px",
  padding: theme.spacing(1),
  boxSizing: "border-box",
  width: "304px",
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
            <Dropdown />

            <StyledButton type="submit" onClick={handleShowCard}>
              Save
            </StyledButton>
          </Modal>
        );

      case "services":
        return (
          <Modal
            onClose={handleCloseModal}
            handleShowCard={handleShowCard}
            modalTitle="Services"
          >
            <Dropdown />

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
    <Container>
      <Card>
        <Box
          sx={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
          }}
        >
          <Grid
            sx={{
              width: "70%",
            }}
          >
            <Title>{title}</Title>
          </Grid>

          <Grid>
            <IconButton
              sx={{ color: "black", border: 2 }}
              onClick={handleOpenModal}
            >
              <AddIcon />
            </IconButton>
            {openModal && renderModal()}
          </Grid>
        </Box>
      </Card>
    </Container>
  );
};

export default Add;

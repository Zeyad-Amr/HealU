import React, { useState } from "react";
import { styled, Theme } from "@mui/material/styles";
import { Button, TextField } from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import Grid from "@mui/material/Grid";
import MultiSelect from "./multiSelect";

interface PrescriptionModalProps {
  onClose: () => void;
}

interface PrescriptionField {
  label: string;
  name: keyof Prescription;
}

interface Prescription {
  drugName: string;
  dose: string;
  notes: string;
  saveTime: string;
}

const ModalWrapper = styled("div")(({ theme }: { theme: Theme }) => ({
  display: "flex",
  marginTop: "5px",
  height: "75vh",
  width: "500px",
  backgroundColor: "#fff",
  boxSizing: "border-box",
  borderRadius: "10px",
  alignItems: "left",
  boxShadow: "0 2px 5px rgba(0, 0, 0, 0.1)",
  position: "fixed",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  zIndex: 100,
}));

const ModalTitle = styled("h3")({
  marginTop: -16,
  marginBottom: 30,
  textAlign: "left",
  fontSize: "28px",
});

const ExitButton = styled("div")({
  backgroundColor: "transparent",
  border: "none",
  cursor: "pointer",
  marginLeft: "430px",
  MarginTop: "-120px",
});

const FormWrapper = styled("form")(({ theme }: { theme: Theme }) => ({
  display: "flex",
  flexDirection: "column",
  backgroundColor: "white",
  padding: "20px",
  borderRadius: "5px",
  marginLeft: "5px",
  marginTop: "20px",
  width: "500px",
}));

const LabelWrapper = styled("label")(({ theme }: { theme: Theme }) => ({
  display: "flex",
  flexDirection: "column",
  marginBottom: "10px",
  color: "#757575",
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

const StyledButton = styled(Button)(({ theme }: { theme: Theme }) => ({
  alignSelf: "center",
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
    boxShadow: "0 5px #666",
    transform: "translateY(4px)",
  },
}));
const PrescriptionModal: React.FC<PrescriptionModalProps> = ({ onClose }) => {
  const [prescription, setPrescription] = useState({
    drugName: "Cometrex",
    dose: "30 ML",
    notes: "Test",
    saveTime: "After Breakfast",
  });

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement>,
    name: keyof Prescription
  ) => {
    const { value } = e.target;
    setPrescription((prevPrescription) => ({
      ...prevPrescription,
      [name]: value,
    }));
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    console.log(prescription);
    // Submit logic here
  };

  const prescriptionFields: PrescriptionField[] = [
    { label: "Drug Name", name: "drugName" },
    { label: "Dose", name: "dose" },
    { label: "Notes", name: "notes" },
  ];

  return (
    <ModalWrapper>
      <FormWrapper onSubmit={handleSubmit}>
        <Grid item>
          <ExitButton onClick={onClose}>
            <CloseIcon />
          </ExitButton>
        </Grid>
        <Grid item>
          <ModalTitle>Prescription</ModalTitle>
        </Grid>

        {prescriptionFields.map((field) => (
          <LabelWrapper key={field.name}>
            {field.label}
            <InputWrapper
              type="text"
              name={field.name}
              value={prescription[field.name]}
              onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                handleChange(e, field.name)
              }
            />
          </LabelWrapper>
        ))}

        <LabelWrapper>
          Time
          <MultiSelect />
        </LabelWrapper>

        <StyledButton type="submit">Save</StyledButton>
      </FormWrapper>
    </ModalWrapper>
  );
};

export default PrescriptionModal;

import React, { useState } from "react";
import { styled, Theme } from "@mui/material/styles";
import { Button, TextField } from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import Grid from "@mui/material/Grid";
import MultiSelect from "./multiSelect";

interface PrescriptionModalProps {
  onClose: () => void;
}

const ModalWrapper = styled("div")(({ theme }: { theme: Theme }) => ({
  display: "flex",
  marginTop: "100px",
  height: "75vh",
  width: "500px",
  border: " 1px solid white",
  boxSizing: "border-box",
  borderRadius: "10px",
  alignItems: "left",
  boxShadow: "0 2px 5px rgba(0, 0, 0, 0.1)",
}));

const ModalTitle = styled("h3")({
  //   marginTop: -40,
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
  //   alignItems: "left",
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

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setPrescription({ ...prescription, [name]: value });
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    console.log(prescription);
    // Submit logic here
  };

  return (
    <ModalWrapper>
      <FormWrapper onSubmit={handleSubmit}>
        <Grid item>
          <ExitButton>
            <CloseIcon />
          </ExitButton>
        </Grid>
        <Grid item>
          <ModalTitle>Prescription</ModalTitle>
        </Grid>

        <LabelWrapper>
          Drug Name
          <InputWrapper
            type="text"
            name="drugName"
            value={prescription.drugName}
            onChange={handleChange}
          />
        </LabelWrapper>
        <LabelWrapper>
          Dose
          <InputWrapper
            type="text"
            name="dose"
            value={prescription.dose}
            onChange={handleChange}
          />
        </LabelWrapper>
        <LabelWrapper>
          Time
          <MultiSelect />
        </LabelWrapper>
        <LabelWrapper>
          Notes
          <InputWrapper
            type="text"
            name="notes"
            value={prescription.notes}
            onChange={handleChange}
          />
        </LabelWrapper>
        <StyledButton type="submit">Save</StyledButton>
      </FormWrapper>
    </ModalWrapper>
  );
};

export default PrescriptionModal;

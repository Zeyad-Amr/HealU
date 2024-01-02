import React, { useState } from "react";
import { styled, Theme } from "@mui/material/styles";
import { Button, TextField } from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import Grid from "@mui/material/Grid";
import MultiSelect from "./multiSelect";

interface ModalProps<T> {
  onClose: () => void;
  handleShowCard: () => void;
  modals?: { label: string; name: string }[];
  initialData?: T;
  modalTitle: string;
  additionalElements?: JSX.Element[];
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

const Modal = <T extends Record<string, any>>({
  onClose,
  handleShowCard,
  modalTitle,
  modals = [],
  initialData = {} as T,
  additionalElements,
}: ModalProps<T>) => {
  const [formData, setFormData] = useState(initialData);
  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement>,
    name: keyof T
  ) => {
    const { value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };
  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    console.log(formData);
    // Submit logic here
  };

  return (
    <ModalWrapper>
      <FormWrapper onSubmit={handleSubmit}>
        <Grid item>
          <ExitButton onClick={onClose}>
            <CloseIcon />
          </ExitButton>
        </Grid>
        <Grid item>
          <ModalTitle>{modalTitle}</ModalTitle>
        </Grid>

        {modals.map((modal) => (
          <LabelWrapper key={modal.name as string}>
            {modal.label}
            <InputWrapper
              type="text"
              name={modal.name as string}
              value={formData[modal.name]}
              onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                handleChange(e, modal.name)
              }
            />
          </LabelWrapper>
        ))}

        {additionalElements &&
          additionalElements.map((element, index) => (
            <LabelWrapper key={`additional-element-${index}`}>
              {element}
            </LabelWrapper>
          ))}
        <StyledButton type="submit" onClick={handleShowCard}>
          Save
        </StyledButton>
      </FormWrapper>
    </ModalWrapper>
  );
};

export default Modal;

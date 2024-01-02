import React, { ReactNode } from "react";
import { styled, Theme } from "@mui/material/styles";
import CloseIcon from "@mui/icons-material/Close";
import Grid from "@mui/material/Grid";

interface ModalProps {
  onClose: () => void;
  handleShowCard: () => void;
  children: ReactNode;
  modalTitle: string;
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

const Modal: React.FC<ModalProps> = ({
  onClose,
  handleShowCard,
  modalTitle,
  children,
}) => {
  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
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
        {children}
      </FormWrapper>
    </ModalWrapper>
  );
};

export default Modal;

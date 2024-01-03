import React from "react";
import { styled, Theme } from "@mui/material/styles";

interface ButtonProps {
  label: string;
  onClick: () => void;
}

const StyledButton = styled("button")(({ theme }: { theme: Theme }) => ({
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
  display: "inline-block",
  transition: "background-color 0.3s ease",
  "&:hover": {
    backgroundColor: "#0056b3",
  },
  "&:active": {
    backgroundColor: "#004085",
    transform: "translateY(4px)",
  },
}));

const Button: React.FC<ButtonProps> = ({ label, onClick }) => {
  return <StyledButton>{label}</StyledButton>;
};

export default Button;

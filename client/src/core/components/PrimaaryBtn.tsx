import { Box } from "@mui/material";
import React from "react";
interface PrimaaryBtnProps {
  title: string;
  Func: () => void;
  sx?: {};
}
const PrimaaryBtn = ({ title, Func, sx }: PrimaaryBtnProps) => {
  return (
    <Box
      sx={{
        minWidth: "fit-content",
        borderRadius: " 5px",
        background: " linear-gradient(285deg, #01B6B6 10.66%, #13D2DE 102.7%)",
        padding: "0.7rem 3rem",
        color: "white",
        fontWeight: "600",
        cursor: "pointer",
        textAlign: "center",
        ...sx,
      }}
      onClick={Func}
    >
      {title}
    </Box>
  );
};

export default PrimaaryBtn;

import { Box, Typography } from "@mui/material";
import React from "react";

interface PatientDataHeaderProps {
  title: string;
}

const PatientDataHeader = ({ title }: PatientDataHeaderProps) => {
  return (
    <Box
      sx={{
        display: "flex",
        alignItems: "center",
        marginY: "1rem",
      }}
    >
      <Typography
        sx={{
          minWidth: "max-content",
          fontSize: "1.5rem",
          fontWeight: "600",
        }}
      >
        {title}
      </Typography>
      <Box
        sx={{
          height: "2px",
          width: "100%",
          backgroundColor: "#000",
          marginLeft: "1rem",
        }}
      ></Box>
    </Box>
  );
};

export default PatientDataHeader;

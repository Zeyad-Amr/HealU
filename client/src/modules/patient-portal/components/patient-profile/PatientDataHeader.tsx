import { Box, Typography } from "@mui/material";
import React from "react";

interface PatientDataHeaderProps {
  title: string;
  color?: string;
}

const PatientDataHeader = ({ title, color }: PatientDataHeaderProps) => {
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
          color: `${color ? color : "black"}`,
        }}
      >
        {title}
      </Typography>
      <Box
        sx={{
          height: "2px",
          width: "100%",
          backgroundColor: `${color ? color : "black"}`,
          marginLeft: "1rem",
        }}
      ></Box>
    </Box>
  );
};

export default PatientDataHeader;

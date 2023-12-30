import { Box, Typography } from "@mui/material";
import React from "react";

interface CustomHeaderPropsI {
  title: string;
  titleColor?: string;
  separatorColor?: string;
  separatorWidth: string;
}

const CustomHeader = ({
  title,
  titleColor = '',
  separatorColor = '',
  separatorWidth,
}: CustomHeaderPropsI) => {
  return (
    <Box>
      <Typography
        variant="h2"
        sx={{ marginBottom: "2rem", color: `${titleColor}` }}
      >
        {title}
      </Typography>
      <Box
        sx={{
          height: "2px",
          width: `${separatorWidth}`,
          backgroundColor: `${separatorColor}`,
          marginBottom: "2rem",
        }}
      ></Box>
    </Box>
  );
};

export default CustomHeader;

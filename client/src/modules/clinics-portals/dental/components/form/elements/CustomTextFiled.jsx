import React from "react";
import { TextField } from "@mui/material";

const CustomTextField = ({ label, value, onChange, ...props }) => {
  return (
    <TextField
      variant="outlined"
      size="small"
      label={label}
      value={value}
      onChange={onChange}
      {...props}
    />
  );
};

export default CustomTextField;

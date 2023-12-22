import React from "react";
import { TextField } from "@mui/material";

const CustomTextArea = ({
  label,
  value,
  onChange,
  minRows = 2,
  width = "242px",
  maxHeight = "100px",
  ...props
}) => {
  return (
    <TextField
      variant="outlined"
      label={label}
      value={value}
      onChange={onChange}
      multiline
      style={{ overflowY: "auto", width, maxHeight }}
      minRows={minRows}
      {...props}
    />
  );
};

export default CustomTextArea;

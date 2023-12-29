import React, { ChangeEvent } from "react";
import { TextField, TextFieldProps } from "@mui/material";

interface CustomTextFieldProps
  extends Omit<TextFieldProps, "value" | "onChange"> {
  label: string;
  value?: string;
  onChange?: (event: ChangeEvent<HTMLInputElement>) => void;
}

const CustomTextField: React.FC<CustomTextFieldProps> = ({
  label,
  value,
  onChange,
  ...props
}) => {
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

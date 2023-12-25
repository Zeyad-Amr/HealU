import React from "react";
import {
  Select,
  FormControl,
  InputLabel,
  MenuItem,
} from "@mui/material";

interface Option {
  label: string;
  value: any;
}

interface CustomSelectProps {
  label: string;
  options: Option[];
  selectedValue?: string[];
  onChange?:any;
  width?: string;
}

const CustomSelect: React.FC<CustomSelectProps> = ({
  label,
  options,
  selectedValue,
  onChange,
  width = "232px",
}) => {
  const selectStyle = { width };

  return (
    <FormControl>
      <InputLabel>{label}</InputLabel>
      <Select label={label} value={selectedValue} style={selectStyle} onChange={onChange}>
        {options.map((option) => (
          <MenuItem key={option.value} value={option.value}>
            {option.label}
          </MenuItem>
        ))}
      </Select>
    </FormControl>
  );
};

export default CustomSelect;

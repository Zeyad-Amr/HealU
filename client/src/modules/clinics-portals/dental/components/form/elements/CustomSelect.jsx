import React from "react";
import { Select, FormControl, InputLabel, MenuItem } from "@mui/material";

const CustomSelect = ({
  label,
  options,
  selectedValue,
  width = "232px",
}) => {
  const selectStyle = { width };

  return (
    <FormControl>
      <InputLabel>{label}</InputLabel>
      <Select
        label={label}
        value={selectedValue}
        style={selectStyle}
      >
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

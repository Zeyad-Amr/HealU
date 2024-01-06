import React, {ChangeEvent} from "react";
import { Select, FormControl, InputLabel, MenuItem, Chip, SelectChangeEvent } from "@mui/material";



interface Option {
  label: string;
  value: any;
}

interface CustomMultiSelectProps {
  label: string;
  options: Option[];
  width?: string;
  selectedValues: string[];
  onChange: (event: SelectChangeEvent<string[]>) => void;
}

const CustomMultiSelect: React.FC<CustomMultiSelectProps> = ({
  label,
  options,
  width = "232px", // Default width or use the provided width
  selectedValues,
  onChange,
  ...props
}) => {
  const selectStyle = { width };

  return (
    <FormControl>
      <InputLabel>{label}</InputLabel>
      <Select
        label={label}
        multiple
        value={selectedValues}
        onChange={onChange}
        style={selectStyle}
        renderValue={(selected) => (
          <div
            style={{
              display: "flex",
              flexWrap: "wrap",
              maxHeight: "50px", // Set your desired max height for the selected values container
              overflowY: "auto", // Enable vertical scrolling
            }}
          >
            {selected.map((value) => (
              <Chip
                key={value}
                label={options.find((option) => option.value === value)?.label}
              />
            ))}
          </div>
        )}
        MenuProps={{
          PaperProps: {
            style: {
              maxHeight: "100px", // Set your desired max height for the menu
              overflowY: "auto", // Enable vertical scrolling
            },
          },
        }}
        {...props}
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

export default CustomMultiSelect;

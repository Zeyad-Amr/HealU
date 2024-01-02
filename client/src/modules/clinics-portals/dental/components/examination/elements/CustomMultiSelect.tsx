import React, { ChangeEvent } from "react";
import {
  Select,
  FormControl,
  InputLabel,
  MenuItem,
  Chip,
  SelectChangeEvent,
} from "@mui/material";

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
  selectedValues,
  onChange,
  ...props
}) => {
  return (
    <FormControl>
      <InputLabel>{label}</InputLabel>
      <Select
        label={label}
        multiple
        value={selectedValues}
        onChange={onChange}
        renderValue={(selected) => (
          <div>
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

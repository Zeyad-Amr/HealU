import React, { useState } from "react";
import { FormControl, Select, MenuItem, Chip } from "@mui/material";
import CancelIcon from "@mui/icons-material/Cancel";
import { SelectChangeEvent } from "@mui/material/Select";

const Dropdown: React.FC = () => {
  const [selectedOptions, setSelectedOptions] = useState<string[]>([]);

  const options = [
    { value: "cbc", label: "CBC" },
    { value: "vitamin D", label: "Vitamin D" },
  ];

  const handleOptionChange = (event: SelectChangeEvent<string[]>) => {
    setSelectedOptions(event.target.value as string[]);
  };

  const handleDeleteOption = (option: string) => {
    const updatedOptions = selectedOptions.filter(
      (selectedOption) => selectedOption !== option
    );
    setSelectedOptions(updatedOptions);
  };

  const renderSelectedOptions = (selected: string[]) => {
    return (
      <div>
        {selected.map((option) => (
          <Chip
            key={option}
            label={option}
            onDelete={() => handleDeleteOption(option)}
            deleteIcon={
              <CancelIcon onClick={() => handleDeleteOption(option)} />
            }
          />
        ))}
      </div>
    );
  };

  return (
    <div>
      <FormControl fullWidth>
        <Select
          id="frameworks"
          multiple
          value={selectedOptions}
          onChange={handleOptionChange}
          renderValue={renderSelectedOptions}
        >
          {options.map((option) => (
            <MenuItem key={option.value} value={option.value}>
              {option.label}
            </MenuItem>
          ))}
        </Select>
      </FormControl>
    </div>
  );
};

export default Dropdown;

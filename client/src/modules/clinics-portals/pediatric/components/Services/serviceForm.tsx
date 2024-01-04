import React from "react";
import { useState } from "react";
import { Grid } from "@mui/material";
import Item from "@mui/material/Grid";
import { TextField } from "@mui/material";
import { Button } from "@mui/material";
import Chip from "@mui/material/Chip";
import Stack from "@mui/material/Stack";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select, { SelectChangeEvent } from "@mui/material/Select";

export interface serviceData {
  ServiceName: string[];
}
interface ChildProps {
  DataFromservice: (data: serviceData) => void;
  OnClose: () => void;
}

const AddServicesForm = (props: ChildProps) => {
  const serviceOptions = [
    { value: "Vaccine", label: "Vaccine" },
    { value: "IVAdministration", label: "IV administration" },
    { value: "Nebulizer", label: "Nebulizer" },
    { value: "NasalHygiene", label: "Nasal hygiene/cleaning" },
    { value: "EarHygiene", label: "Ear hygiene/cleaning" },
    // Add other options as needed
  ];

  const [selectedTests, setSelectedTests] = useState<string[]>([]);

  const handleChange = (event: React.ChangeEvent<{ value: unknown }>) => {
    const selectedValue = event.target.value as string[];

    setSelectedTests(selectedValue);
  };

  const handleDelete = (valueToDelete: string) => {
    const filteredTests = selectedTests.filter(
      (value) => value !== valueToDelete
    );
    setSelectedTests(filteredTests);
  };

  const preventMenuOpen = (
    event: React.MouseEvent<HTMLDivElement, MouseEvent>
  ) => {
    event.preventDefault();
    event.stopPropagation();
  };
  const handelSubmit = () => {
    props.DataFromservice({ ServiceName: selectedTests });
    props.OnClose();
  };
  return (
    <FormControl sx={{ m: 1, minWidth: 240 }} size="small">
      <InputLabel id="demo-select-small-label">Services</InputLabel>
      <Select
        labelId="service"
        id="ServiceName"
        multiple
        value={selectedTests}
        label="Service"
        onChange={handleChange as (event: SelectChangeEvent<string[]>) => void}
        renderValue={() => (
          <Stack direction="row" spacing={1}>
            {selectedTests.map((value) => (
              <Chip
                key={value}
                label={value}
                onDelete={() => handleDelete(value)}
                onMouseDown={preventMenuOpen}
                sx={{
                  backgroundColor: selectedTests.includes(value)
                    ? "#555555"
                    : "",
                  color: selectedTests.includes(value) ? "#ffffff" : "",
                }}
              />
            ))}
          </Stack>
        )}
      >
        {serviceOptions.map((option) => (
          <MenuItem key={option.value} value={option.value}>
            {option.label}
          </MenuItem>
        ))}
      </Select>
      <div className="Controls">
        <Button variant="contained" onClick={handelSubmit}>
          Save
        </Button>
      </div>
    </FormControl>
  );
};

export default AddServicesForm;

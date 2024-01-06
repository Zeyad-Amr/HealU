import React from "react";
import { useState } from "react";
import { Button } from "@mui/material";
import Chip from "@mui/material/Chip";
import Stack from "@mui/material/Stack";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select, { SelectChangeEvent } from "@mui/material/Select";

export interface testsData {
  TestName: string[];
}

interface ChildProps {
  DataFromTests: (data: testsData) => void;
  OnClose: () => void;
}

const AddTestsForm = (props: ChildProps) => {
  const testOptions = [
    { value: "CBC", label: "Complete Blood Picture (CBC)" },
    { value: "Bilirubin", label: "Bilirubin Total" },
    { value: "Glucose", label: "Plasma Glucose" },
    { value: "Stool", label: "Stool Examination" },
    { value: "Urine", label: "Urine Analysis" },
    { value: "ASOT", label: "ASOT (Latex)" },
    { value: "Ferritin", label: "Ferritin in Serum" },
    { value: "VitaminD", label: "25(OH) Vitamin D" },
    { value: "TSH", label: "TSH" },
    { value: "Hearing", label: "Hearing tests" },
    { value: "Sensitivity", label: "Sensitivity test" },
    { value: "ESR", label: "Erythrocyte Sedimentation Rate (ESR)" },
  ];

  const handelSubmit = () => {
    props.DataFromTests({ TestName: selectedTests });
    props.OnClose();
  };

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

  return (
    <FormControl sx={{ m: 1, minWidth: 240 }} size="small">
      <InputLabel id="demo-select-small-label">Tests</InputLabel>
      <Select
        labelId="Tests"
        id="medicalTests"
        multiple
        value={selectedTests}
        label="Tests"
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
        {testOptions.map((option) => (
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

export default AddTestsForm;

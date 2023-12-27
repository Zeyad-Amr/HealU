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
import Autocomplete, { createFilterOptions } from "@mui/material/Autocomplete";

const AddTestsForm = (props: any) => {
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
    // dispatch(
    //   AddTest({
    //     MedicalTests: [],
    //   })
    // );
    props.closeModal();
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

//     const [selectedTests, setSelectedTests] = useState<string[]>([]);
//   const filter = createFilterOptions();

//   const handleDelete = (valueToDelete: string) => {
//     const filteredTests = selectedTests.filter((value) => value !== valueToDelete);
//     setSelectedTests(filteredTests);
//   };

//   const handleSubmit = () => {
//     // Perform actions on form submission
//   };

//   return (
//     <FormControl sx={{ m: 1, minWidth: 240 }} size="small">
//       <InputLabel id="demo-autocomplete-label">Tests</InputLabel>
//       <Autocomplete
//         multiple
//         id="medicalTests"
//         options={testOptions}
//         getOptionLabel={(option) => option.label}
//         value={testOptions.filter(option => selectedTests.includes(option.value))}
//         onChange={(event, newValue: { value: string; label: string; }[]) => {
//           setSelectedTests(newValue.map(option => option.value));
//         }}
//         filterOptions={(options, params) => {
//           const filtered = createFilterOptions<{ value: string; label: string }>()(
//             options,
//             params
//           );

//           if (params.inputValue !== '') {
//             filtered.push({
//               value: params.inputValue,
//               label: `Add "${params.inputValue}"`,
//             });
//           }

//           return filtered as { value: string; label: string }[];
//         }}
//         renderInput={(params) => (
//           <TextField
//             {...params}
//             label="Tests"
//           />
//         )}
//         renderTags={(value, getTagProps) =>
//           value.map((option, index) => (
//             <Chip
//             key={`${option.value}-${index}`} // Use a combination of value and index for uniqueness
//               label={option.label}
//               {...getTagProps({ index })}
//               onDelete={() => handleDelete(option.value)}
//             />
//           ))
//         }
//       />
//       <div className="Controls">
//         <Button variant="contained" onClick={handleSubmit}>
//           Save
//         </Button>
//       </div>
//     </FormControl>
//   );
// };

// export default AddTestsForm;

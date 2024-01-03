import * as React from "react";
import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";
import MenuItem from "@mui/material/MenuItem";

const time = [
  {
    value: "After Breakfast",
    label: "After Breakfast",
  },
  {
    value: "Before Breakfast",
    label: "Before Breakfast",
  },
  {
    value: "After Lunch",
    label: "After Lunch",
  },
  {
    value: "Before Lunch",
    label: "Before Lunch",
  },
];

export default function SelectTextFields({changeHandler = (e: any) => {} }) {
  return (
    <Box
      component="form"
      sx={{
        "& .MuiTextField-root": {
          m: 1,
          width: "455px",
          borderRadius: "10px",
          backgroundColor: "#F5F5F5",
          marginLeft: "2px",
        },
      }}
      noValidate
      autoComplete="off"
    >
      <div></div>
      <div>
        <TextField
          id="select-time"
          select
          label="Select"
          defaultValue="After Breakfast"
          variant="filled"
          onChange={changeHandler}
        >
          {time.map((option) => (
            <MenuItem key={option.value} value={option.value}>
              {option.label}
            </MenuItem>
          ))}
        </TextField>
      </div>
    </Box>
  );
}

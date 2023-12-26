import React from "react";
import { Grid } from "@mui/material";
import Item from "@mui/material/Grid";
import { TextField } from "@mui/material";

const AddPrescreptionForm = () => {
  return (
    <Grid container spacing={2} columns={8}>
      <Grid item xs={8}>
        <Item>
          <TextField fullWidth label="Drug" id="Drug" />
        </Item>
      </Grid>
      <Grid item xs={4}>
        <TextField fullWidth label="Dose" id="Dose" />
      </Grid>
      <Grid item xs={4}>
        <TextField fullWidth label="Time" id="Time" />
      </Grid>
      <Grid item xs={8}>
      <TextField
          id="Notes"
          label="Notes"
          multiline
                  rows={4}
                    fullWidth
          variant="filled"
        />
      </Grid>
    </Grid>
  );
};
export default AddPrescreptionForm;

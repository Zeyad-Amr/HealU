import React, { useState } from "react";
import { Grid } from "@mui/material";
import Item from "@mui/material/Grid";
import { TextField } from "@mui/material";
import { Button } from "@mui/material";

export interface PrescreptionData {
  Drug: string;
  Dose: string;
  Time: string;
  Notes: string;
}

interface ChildProps {
  DataFromPrescreption: (data: PrescreptionData) => void;
  OnClose: () => void;
}

const AddPrescreptionForm = (props: ChildProps) => {
  const [formData, setFormData] = useState<PrescreptionData>({
    Drug: "",
    Dose: "",
    Time: "",
    Notes: "",
  });

  // const handledrugChange = (event: React.ChangeEvent<HTMLInputElement>) => {
  // const { id, value } = event.target;
  // };

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { id, value } = event.target;
    setFormData((prevData) => ({
      ...prevData,
      [id]:
        id === "PatientWeight" || id === "PatientHeight"
          ? parseFloat(value)
          : value,
    }));
  };

  const handelSubmit = () => {
    props.DataFromPrescreption(formData);
    props.OnClose();
  };
  return (
    <>
      <Grid container spacing={2} columns={8}>
        <Grid item xs={8}>
          <Item>
            <TextField
              fullWidth
              label="Drug"
              id="Drug"
              onChange={handleInputChange}
            />
          </Item>
        </Grid>
        <Grid item xs={4}>
          <TextField
            fullWidth
            label="Dose"
            id="Dose"
            onChange={handleInputChange}
          />
        </Grid>
        <Grid item xs={4}>
          <TextField
            fullWidth
            label="Time"
            id="Time"
            onChange={handleInputChange}
          />
        </Grid>
        <Grid item xs={8}>
          <TextField
            id="Notes"
            label="Notes"
            multiline
            rows={4}
            fullWidth
            variant="filled"
            onChange={handleInputChange}
          />
        </Grid>
      </Grid>
      <div className="Controls">
        <Button variant="contained" onClick={handelSubmit}>
          Save
        </Button>
      </div>
    </>
  );
};
export default AddPrescreptionForm;

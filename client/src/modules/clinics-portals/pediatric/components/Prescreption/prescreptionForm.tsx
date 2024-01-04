import React, { useState } from "react";
import { Grid } from "@mui/material";
import Item from "@mui/material/Grid";
import { TextField } from "@mui/material";
import { Button } from "@mui/material";
import { drugData } from "../../slices/prescreption-slice";

interface ChildProps {
  DataFromPrescreption: (data: drugData) => void;
  OnClose: () => void;
}

const AddPrescreptionForm = (props: ChildProps) => {
  const [formData, setFormData] = useState<drugData>({
    DrugName: "",
    DrugDose: "",
    DrugDuration: "",
  });

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { id, value } = event.target;
    setFormData((prevData) => ({
      ...prevData,
      [id]: value,
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
              id="DrugName"
              onChange={handleInputChange}
            />
          </Item>
        </Grid>
        <Grid item xs={4}>
          <TextField
            fullWidth
            label="Dose"
            id="DrugDose"
            onChange={handleInputChange}
          />
        </Grid>
        <Grid item xs={4}>
          <TextField
            fullWidth
            label="Time"
            id="DrugDuration"
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

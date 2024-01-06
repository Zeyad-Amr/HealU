import React from "react";
import { useState } from "react";
import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";
import "./container.css";
import Grid from "@mui/material/Grid";

export interface diagnosisData {
  Diagnosis: string;
  ExtraNotes: string;
  PatientWeight: number;
  PatientHeight: number;
  RecommendedActionDescription: string;
  BloodPressure: string;
  RespirationRate: string;
  HeartRate: string;
  DiabeticTest: string;
  SPO2: string;
}
interface ChildProps {
  DataFromDiagnosis: (data: diagnosisData) => void;
}
const Diagnosis = (props: ChildProps) => {
  const [formData, setFormData] = useState<diagnosisData>({
    Diagnosis: "",
    ExtraNotes: "",
    PatientWeight: 0,
    PatientHeight: 0,
    RecommendedActionDescription: "",
    BloodPressure: "",
    RespirationRate: "",
    HeartRate: "",
    DiabeticTest: "",
    SPO2: "",
  });

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
  const handleBlur = (event: React.FocusEvent<HTMLInputElement>) => {
    props.DataFromDiagnosis(formData);
  };
  return (
    <>
      <Box
        component="form"
        sx={{
          "& .MuiTextField-root": { m: 1 },
        }}
        noValidate
        autoComplete="off"
      >
        <Grid container spacing={0} columns={16} className="diagnosisframe">
          <Grid item xs={4}>
            <TextField
              id="Diagnosis"
              label="Diagnosis"
              multiline
              rows={6}
              onChange={handleInputChange}
              className="input"
              onBlur={handleBlur}
            />
          </Grid>
          <Grid item xs={4}>
            <TextField
              id="ExtraNotes"
              label="ExtraNotes"
              onChange={handleInputChange}
              className="input"
              onBlur={handleBlur}
            />
            <TextField
              id="RecommendedActionDescription"
              label="RecommendedAction"
              onChange={handleInputChange}
              className="input"
              onBlur={handleBlur}
            />
            <TextField
              id="PatientWeight"
              label="Weights"
              onChange={handleInputChange}
              className="input"
              onBlur={handleBlur}
            />
          </Grid>
          <Grid item xs={4}>
            <TextField
              id="PatientHeight"
              label="Heigth"
              onChange={handleInputChange}
              className="input"
              onBlur={handleBlur}
            />

            <TextField
              id="BloodPressure"
              label="BloodPressure"
              onChange={handleInputChange}
              className="input"
              onBlur={handleBlur}
            />
            <TextField
              id="RespirationRate"
              label="RespirationRate"
              onChange={handleInputChange}
              className="input"
              onBlur={handleBlur}
            />
          </Grid>
          <Grid item xs={4}>
            <TextField
              id="HeartRate"
              label="Heart Rate"
              onChange={handleInputChange}
              className="input"
              onBlur={handleBlur}
            />
            <TextField
              id="DiabeticTest"
              label="Diabetic Test"
              onChange={handleInputChange}
              className="input"
              onBlur={handleBlur}
            />
            <TextField
              id="SPO2"
              label="SPO2"
              onChange={handleInputChange}
              className="input"
              onBlur={handleBlur}
            />
          </Grid>
        </Grid>
      </Box>
    </>
  );
};
export default Diagnosis;

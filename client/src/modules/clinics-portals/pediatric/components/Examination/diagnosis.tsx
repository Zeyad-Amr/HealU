import React from "react";
import { useEffect } from "react";
import { useState } from "react";
import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";

import "./container.css";
import { Button } from "@mui/material";

interface FormData {
  Diagnosis: string;
  ExtraNotes: string; 
  PatientWeight: number;
  PatientHeight: number;
  RecommendedActionDescription:string;
  BloodPressure:string;
  RespirationRate:string;
  HeartRate:string;
  DiabeticTest:string;
  SPO2:string;
}


const Diagnosis = () => {
  const [formData, setFormData] = useState<FormData>({
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

  return (
    <>
    <Box
      component="form"
      sx={{
        '& .MuiTextField-root': { m: 1, width: '25ch' },
      }}
      noValidate
      autoComplete="off"
    >
      <div className="diagnosisframe">
      
      <TextField
          id="outlined-multiline-static"
          label="Diagnosis"
          multiline
          rows={5}
          defaultValue="Note"          
        />
      
      
        <div className="postionofdiagnosis">
        <TextField
          id="outlined-multiline-static"
          label="ExtraNotes"         
          defaultValue="Note"          
        />
        <TextField
          id="outlined-multiline-static"
          label="RecommendedAction"         
          defaultValue="Note"          
        />
        <TextField
          id="outlined-multiline-static"
          label="Weights"
          defaultValue="Enter"          
        />
        <TextField
          id="outlined-multiline-static"
          label="Length"          
          defaultValue="Enter"          
        />    
              
        <TextField
          id="outlined-multiline-static"
          label="BloodPressure"         
          defaultValue="Enter"           
        />
        <TextField
          id="outlined-multiline-static"
          label="RespirationRate" 
          defaultValue="Enter"           
        />
        <TextField
          id="outlined-multiline-static"
          label="Heart Rate"           
          defaultValue="Enter"           
        />
        <TextField
          id="outlined-multiline-static"
          label="Diabetic Test"         
          defaultValue="Enter"           
        />
        <TextField
          id="outlined-multiline-static"
          label="SPO2"
          defaultValue="Enter"           
        />
        </div>
        
        <div className="postionbutton"><Button variant="contained">Done</Button></div>
        
      </div>
      
      
    </Box>
    </>
  );
};
export default Diagnosis;
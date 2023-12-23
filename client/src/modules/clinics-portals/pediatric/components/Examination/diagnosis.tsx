import React from "react";
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


const Diagnosis : React.FC = () => {
  const [formData, setFormData] = useState<FormData>({
    Diagnosis: "Note",
    ExtraNotes: "Note",
    PatientWeight: 0,
    PatientHeight: 0,
    RecommendedActionDescription: "Note",
    BloodPressure: "Enter",
    RespirationRate: "Enter",
    HeartRate: "Enter",
    DiabeticTest: "Enter",
    SPO2: " Enter",
  });

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { id, value } = event.target;
    setFormData((prevData) => ({
      ...prevData,
      [id]: id === "PatientWeight" || id === "PatientHeight" ? parseFloat(value) : value,
    }));
  };

  const handleDoneClick = () => {
    console.log(formData); // You can further process or send this data
  };
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
          id="Diagnosis"
          label="Diagnosis"
          multiline
          rows={5}
          placeholder={formData.Diagnosis}
          onChange={handleInputChange}         
        />
      
      
        <div className="postionofdiagnosis">
        <TextField
          id="ExtraNotes"
          label="ExtraNotes"         
          placeholder={formData.ExtraNotes}
          onChange={handleInputChange}          
        />
        <TextField
          id="RecommendedActionDescription"
          label="RecommendedAction"         
          placeholder={formData.RecommendedActionDescription}
          onChange={handleInputChange}          
        />
        <TextField
          id=" PatientWeight"
          label="Weights"
          placeholder="Enter" 
          onChange={handleInputChange}          
        />
        <TextField
          id=" PatientHeight"
          label="Heigth"          
          placeholder="Enter" 
          onChange={handleInputChange}          
        />    
              
        <TextField
          id="BloodPressure"
          label="BloodPressure"         
          placeholder={formData.BloodPressure}
          onChange={handleInputChange}           
        />
        <TextField
          id="RespirationRate"
          label="RespirationRate" 
          placeholder={formData.RespirationRate}
          onChange={handleInputChange}           
        />
        <TextField
          id="HeartRate"
          label="Heart Rate"           
          placeholder={formData.HeartRate}
          onChange={handleInputChange}           
        />
        <TextField
          id="DiabeticTest"
          label="Diabetic Test"         
          placeholder={formData.DiabeticTest}     
          onChange={handleInputChange}      
        />
        <TextField
          id="SPO2"
          label="SPO2"
          placeholder={formData.SPO2}  
          onChange={handleInputChange}          
        />
        </div>
        
        <div className="postionbutton"><Button variant="contained"  onClick={handleDoneClick}>Done</Button></div>
        
      </div>
      
      
    </Box>
    </>
  );
};
export default Diagnosis;
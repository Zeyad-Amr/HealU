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


const Diagnosis = () => {
  const [formData, setFormData] = useState<FormData>({
    Diagnosis: "" ,
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
      [id]: id === "PatientWeight" || id === "PatientHeight" ? parseFloat(value) : value,
    }));
  };

  const handleDoneClick = () => {
    const isAnyFieldEmpty = Object.values(formData).some(value => value === "");
    if (isAnyFieldEmpty) {
      alert("Please fill in all fields before submitting.");
      return;
    }
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
          // placeholder={formData.Diagnosis}
          onChange={handleInputChange}         
        />
      
      
        <div className="postionofdiagnosis">
        <TextField
          id="ExtraNotes"
          label="ExtraNotes"         
          // placeholder={formData.ExtraNotes}
          onChange={handleInputChange}          
        />
        <TextField
          id="RecommendedActionDescription"
          label="RecommendedAction"         
          // placeholder={formData.RecommendedActionDescription}
          onChange={handleInputChange}          
        />
        <TextField
          id=" PatientWeight"
          label="Weights"
          // placeholder="Enter" 
          onChange={handleInputChange}          
        />
        <TextField
          id=" PatientHeight"
          label="Heigth"          
          // placeholder="Enter" 
          onChange={handleInputChange}          
        />    
              
        <TextField
          id="BloodPressure"
          label="BloodPressure"         
          // placeholder={formData.BloodPressure}
          onChange={handleInputChange}           
        />
        <TextField
          id="RespirationRate"
          label="RespirationRate" 
          // placeholder={formData.RespirationRate}
          onChange={handleInputChange}           
        />
        <TextField
          id="HeartRate"
          label="Heart Rate"           
          // placeholder={formData.HeartRate}
          onChange={handleInputChange}           
        />
        <TextField
          id="DiabeticTest"
          label="Diabetic Test"         
          // placeholder={formData.DiabeticTest}     
          onChange={handleInputChange}      
        />
        <TextField
          id="SPO2"
          label="SPO2"
          // placeholder={formData.SPO2}  
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
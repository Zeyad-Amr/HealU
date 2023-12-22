import React from "react";
import { useEffect } from "react";
import { useState } from "react";
import { Container } from "@mui/material";
import PatientSection from "./patient/patientData";
import Diagnosis from "./diagnosis";
import "./container.css";
const ExaminationScreen = () => {
    return (
        <>
            <Container maxWidth= "lg" className="container">
             <PatientSection />
             <Diagnosis/>
            </Container>
            
        </>
    )
};
export default ExaminationScreen;
import React from "react";
import { Grid } from "@mui/material";
import PresonalInfo from "./personalinfo";
import HistoryInfo from "./history";
import Item from "@mui/material/Box";
import "./patientData.css";
import {
  appointmentPatient,
  appointmentPatientRecord,
  appointmentMedicalHistory,
} from "../../../slices/appointment-slice";
interface propsData {
  patient: appointmentPatient;
  patientRecord: appointmentPatientRecord;
  medicalHistory: appointmentMedicalHistory;
}
const PatientSection = (props: propsData) => {
  const calculateAge = (dob: string): number | null => {
    const birthDate = new Date(dob);
    const currentDate = new Date();

    if (isNaN(birthDate.getTime())) {
      // Invalid date format
      return null;
    }

    let age = currentDate.getFullYear() - birthDate.getFullYear();

    // Check if birthday has occurred this year
    if (
      currentDate.getMonth() < birthDate.getMonth() ||
      (currentDate.getMonth() === birthDate.getMonth() &&
        currentDate.getDate() < birthDate.getDate())
    ) {
      age--;
    }
    return age;
  };

  return (
    <>
      <div className="patient-section">
        <Grid container spacing={0} columns={16} rowSpacing={7}>
          <Grid item xs={4}>
            <div className="info">
              <div className="personal">
                <p>Personal Data</p>
              </div>
              <Item style={{ fontSize: "8px" }}>
                <PresonalInfo
                  name={
                    props.patient?.firstName + " " + props.patient?.lastName
                  }
                  weight={props.patientRecord?.PatientWeight}
                  height={props.patientRecord?.PatientHeight}
                  age={calculateAge(props.patient?.dateOfBirth.toString())}
                />
              </Item>
            </div>
          </Grid>
          <Grid item xs={12}>
            <HistoryInfo MedicalyHistory={props.medicalHistory} />
          </Grid>
        </Grid>
      </div>
    </>
  );
};
export default PatientSection;

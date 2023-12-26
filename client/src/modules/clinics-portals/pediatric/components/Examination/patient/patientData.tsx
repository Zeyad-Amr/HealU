import React from "react";
import { useEffect } from "react";
import { useState } from "react";
import { Grid } from "@mui/material";
import PresonalInfo from "./personalinfo";
import HistoryInfo from "./history";
import { styled } from "@mui/material/styles";
import Item from "@mui/material/Box";
import Divider from "@mui/material/Divider";
import { useAppDispatch } from "../../../../../../core/store/index";
import { useSelector } from "react-redux";
import { fetchPatientData,PatientsState,Patient} from "../../../slices/patient-slice";
import "./patientData.css";

const PatientSection = () => {
  const dispatch = useAppDispatch();
  const patientState: PatientsState = useSelector(
    (state: any) => state.patients
  );
  const [selectedPatient, setSelectedPatient] = useState<Patient>(
    {} as Patient
  );

  useEffect(() => {
    console.log(dispatch(fetchPatientData(5)));
  }, [patientState]);

  

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
                  name="Naira"
                  weight="56 kg"
                  height="158cm"
                  age="21"
                />
              </Item>
            </div>
          </Grid>
          <Grid item xs={12}>
            <HistoryInfo drugs="Pill" illnesses="low blood" tests="pcr" operation="surgry"/>
          </Grid>
        </Grid>
      </div>
    </>
  );
};
export default PatientSection;

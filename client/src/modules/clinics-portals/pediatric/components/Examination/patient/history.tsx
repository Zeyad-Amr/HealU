import React from "react";
import { useEffect } from "react";
import { useState } from "react";
import { Grid } from "@mui/material";
import "./patientData.css";
import Item from "@mui/material/Box";
import Divider from "@mui/material/Divider";
import { useAppDispatch } from "../../../../../../core/store/index";
import { useSelector } from "react-redux";
import { fetchPatientData, PatientsState } from "../../../slices/patient-slice";
import "./patientData.css";
import Button from "@mui/material/Button";

const HistoryInfo = () => {
  const dispatch = useAppDispatch();
  const patientState: PatientsState = useSelector(
    (state: any) => state.patients
  );
  const [selectedPatient, setSelectedPatient] = useState<PatientsState>({
    patients: [
      {
        PatientID: 0,
        Illnesses: [
          {
            IllnessDescription: "",
          },
        ],
        Operations: [
          {
            OperationName: "",
            OperationDate: "",
          },
        ],
        MedicalTests: [
          {
            TestID: "",
            TestDescription: "",
          },
        ],
        Complaints: [
          {
            ComplaintDescription: "",
          },
        ],
        Drugs: [
          {
            DrugName: "",
            DrugDose: "",
            DrugDuration: "",
          },
        ],
      },
    ],
  } as unknown as PatientsState);
  const handleclick = () => {
    dispatch(fetchPatientData(5));
    setSelectedPatient(patientState);
  };
  useEffect(() => {
    dispatch(fetchPatientData(5));
    setSelectedPatient(patientState);
  }, [selectedPatient]);
  return (
    <>
      <div className="history" onClick={handleclick}>
        <div className="mid">
          <Item>
            <p>History</p>
          </Item>
        </div>
        <Grid container spacing={3} columns={16}>
          <Grid item xs={4}>
            <div className="his1">
              <div className="his2">
                <p>Drugs</p>
              </div>

              <Item style={{ fontSize: "7px" }}>
                {selectedPatient === undefined
                  ? null
                  : selectedPatient.patients[0]?.Drugs.map((item: any) => (
                      <h1>{item.DrugName}</h1>
                    ))}
              </Item>
            </div>
          </Grid>
          <Grid item xs={4}>
            <div className="his1">
              <div className="his2">
                <p>Illnesses</p>
              </div>
              <div className="ill">
                <Item style={{ fontSize: "7px" }}>
                  {selectedPatient === undefined
                    ? null
                    : selectedPatient.patients[0]?.Illnesses.map(
                        (item: any) => <h1>{item.IllnessDescription}</h1>
                      )}
                </Item>
              </div>
            </div>
          </Grid>
          <Grid item xs={8} style={{ fontSize: "7px" }}>
            <div className="his1">
              <Grid container>
                <Grid item xs>
                  <div className="his2">
                    <p>Medical Tests</p>
                  </div>
                </Grid>
                <Grid item xs>
                  <div className="his2">
                    <p>Operations</p>
                  </div>
                </Grid>
              </Grid>

              <Grid container>
                <Grid item xs>
                  {selectedPatient === undefined
                    ? null
                    : selectedPatient.patients[0]?.MedicalTests.map(
                        (item: any) => <h1>{item.TestDescription}</h1>
                      )}
                </Grid>
                <Divider
                  orientation="vertical"
                  flexItem
                  sx={{
                    width: "2px",
                    backgroundColor: "white",
                    margin: "0 8px",
                  }}
                />
                <Grid item xs>
                  {selectedPatient === undefined
                    ? null
                    : selectedPatient.patients[0]?.Operations.map(
                        (item: any) => <h1>{item.OperationName}</h1>
                      )}
                </Grid>
              </Grid>
            </div>
          </Grid>
        </Grid>
      </div>
    </>
  );
};
export default HistoryInfo;

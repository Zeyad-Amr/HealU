import React from "react";
import { useEffect } from "react";
import { useState } from "react";
import { Grid } from "@mui/material";
import "./patientData.css";
import Item from "@mui/material/Box";
import Divider from "@mui/material/Divider";
import "./patientData.css";
import { appointmentMedicalHistory } from "../../../slices/appointment-slice";
interface propsData {
  MedicalyHistory: appointmentMedicalHistory;
}

const HistoryInfo = (props: propsData) => {
  return (
    <>
      <div className="history">
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
                {props.MedicalyHistory === undefined
                  ? null
                  : props.MedicalyHistory.Drugs?.map((item: any) => (
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
                  {props.MedicalyHistory === undefined
                    ? null
                    : props.MedicalyHistory.Illnesses?.map((item: any) => (
                        <h1>{item.IllnessDescription}</h1>
                      ))}
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
                  {props.MedicalyHistory === undefined
                    ? null
                    : props.MedicalyHistory.MedicalTests?.map((item: any) => (
                        <h1>{item.TestDescription}</h1>
                      ))}
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
                  {props.MedicalyHistory === undefined
                    ? null
                    : props.MedicalyHistory.Operations?.map((item: any) => (
                        <h1>{item.OperationName}</h1>
                      ))}
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

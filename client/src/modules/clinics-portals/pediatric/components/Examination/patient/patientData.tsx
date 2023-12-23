import React from "react";
import { useEffect } from "react";
import { useState } from "react";
import { Grid } from "@mui/material";   
import PresonalInfo from "./personalinfo";
import HistoryInfo from "./history";
import { styled } from "@mui/material/styles";
import Item from "@mui/material/Box";
import Divider from "@mui/material/Divider";
import "./patientData.css";

const PatientSection = () => {
    return (
        <>
        <div className="patient-section">
        <Grid container spacing={0} columns={16}>
                <Grid item xs={5}>
                    <div className="info">
                        <div className="personal">
                            <p>
                                Personal Data
                            </p>
                        </div>
                    <Item style={{ fontSize: '8px' }}>
                        <PresonalInfo name ="name : Naira " />
                        <PresonalInfo weight ="weight : 56 kg" />
                        <PresonalInfo height ="height : 158cm" />
                        <PresonalInfo age ="age : 21" />
                    </Item>
                    </div>
                    
                </Grid>
                <Grid item xs={8}>
                    <div className="history">   
                    <div className="mid">
                    <Item>
                        <p> 
                            History
                        </p>
                    </Item>
                    </div>
                    <Grid container spacing={0} columns={16}>
                    <Grid item xs={5}>
                       <div className="his1">
                        <div className="his2">
                                <p>
                                    Drugs
                                </p>
                            </div>
                        <Item style={{ fontSize: '7px' }}>
                        <HistoryInfo drugs="Pill"/>

                        </Item>
                    </div>
                        
                    </Grid>
                    <Grid item xs={5}>
                     <div className="his1">
                     <div className="his2">
                            <p>
                             Illnesses
                            </p>
                        </div>
                    <div className="ill">
                      <Item style={{ fontSize: '7px' }}>
                        <HistoryInfo illnesses="low blood"/>

                        </Item>
                    </div>
                     </div>
                    </Grid>
                    <Grid item xs={5} style={{ fontSize: '7px' }}>
                        
                        <div className="his3">
                        <Grid container>
                                <Grid item xs>
                                <div className="his2">
                                    <p>
                                    Medical Tests
                                    </p>
                                </div>
                               
                                </Grid>
                                <Grid item xs>
                                <div className="his2">
                                    <p>
                                    Operations
                                    </p>
                                </div>
                                
                                </Grid>
                                </Grid>
                        
                        <Grid container>
                                <Grid item xs>
                                   <HistoryInfo tests="pcr"/>
                                </Grid>
                                <Divider orientation="vertical" flexItem sx={{ width: '2px', backgroundColor: 'white', margin: '0 8px'}} />
                                <Grid item xs>
                                
                                <HistoryInfo operation="surgry"/>
                                </Grid>
                                </Grid>
                        
                        </div>
                    </Grid> 

                    </Grid>
                    </div>
                    
                    
                </Grid>
                
                
            </Grid>

        </div>
            
        </>
    )
};
export default PatientSection;
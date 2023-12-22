import React from "react";
import { useEffect } from "react";
import { useState } from "react";
import { Grid } from "@mui/material";   
import PresonalInfo from "./personalinfo";
import HistoryInfo from "./history";
import { styled } from "@mui/material/styles";
import Item from "@mui/material/Box";

const PatientSection = () => {
    return (
        <>
            <Grid container spacing={2} columns={16}>
                <Grid item xs={5}>
                    <Item>
                        <PresonalInfo name ="abram" />
                    </Item>
                </Grid>
                <Grid item xs={8}>
                    <Item>
                        <HistoryInfo />
                    </Item>
                </Grid>
            </Grid>
        </>
    )
};
export default PatientSection;
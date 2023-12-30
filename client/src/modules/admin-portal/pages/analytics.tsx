import React from "react";
import Title from "../components/AnalyticsTitle/title";
import Box from "@mui/material/Box";
import Tab from "@mui/material/Tab";
import Tabs from "@mui/material/Tabs";
import "./analytics.css";
import Display from "../components/dataDispaly/dispaly";

const dataset = [
  {
    diagnostic_reports: 59,
    prescriptions: 57,
    clinc: "clinc 1",
  },
  {
    diagnostic_reports: 59,
    prescriptions: 57,
    clinc: "clinc 2",
  },
  {
    diagnostic_reports: 59,
    prescriptions: 57,
    clinc: "clinc 3",
  },
  {
    diagnostic_reports: 59,
    prescriptions: 57,
    clinc: "clinc 4",
  },
  {
    diagnostic_reports: 59,
    prescriptions: 57,
    clinc: "clinc 5",
  },
  {
    diagnostic_reports: 59,
    prescriptions: 57,
    clinc: "clinc 6",
  },
];

const data = {
  data: [
    { value: 10, label: "Clinc 1" },
    { value: 15, label: "Clinc 2" },
    { value: 20, label: "Clinc 3" },
    { value: 25, label: "Clinc 4" },
    { value: 30, label: "Clinc 5" },
    { value: 35, label: "Clinc 6" },
  ],
};

export default function Analytics() {
  const [value, setValue] = React.useState(0);
  const handleChange = (event: React.SyntheticEvent, newValue: number) => {
    setValue(newValue);
  };
  return (
    <>
      <Title></Title>
      <Box sx={{ borderColor: "divider" }} justifyContent={"center"}>
        <Tabs
          value={value}
          onChange={handleChange}
          aria-label="basic tabs example"
        >
          <Tab label="Day" />
          <Tab label="Week" />
          <Tab label="Month" />
          <Tab label="Year" />
        </Tabs>
      </Box>
      {value === 0 && (
        <Display
          TotalRevenueData={data}
          TotalAppointmentsData={data}
          TotalRecordsData={data}
          TypesOfRecords={dataset}
          GenderDistribution={dataset}
        ></Display>
      )}
      {value === 1 && (
        <Display
          TotalRevenueData={data}
          TotalAppointmentsData={data}
          TotalRecordsData={data}
          TypesOfRecords={dataset}
          GenderDistribution={dataset}
        ></Display>
      )}
      {value === 2 && (
        <Display
          TotalRevenueData={data}
          TotalAppointmentsData={data}
          TotalRecordsData={data}
          TypesOfRecords={dataset}
          GenderDistribution={dataset}
        ></Display>
      )}
      {value === 3 && (
        <Display
          TotalRevenueData={data}
          TotalAppointmentsData={data}
          TotalRecordsData={data}
          TypesOfRecords={dataset}
          GenderDistribution={dataset}
        ></Display>
      )}
    </>
  );
}

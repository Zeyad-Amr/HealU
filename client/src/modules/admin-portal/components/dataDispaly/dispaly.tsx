import React from "react";
import Grid from "@mui/material/Grid";
import { PieChart } from "@mui/x-charts/PieChart";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import { BarChart } from "@mui/x-charts/BarChart";

export interface DisplayProps {
  TotalRevenueData: any;
  TotalRecordsData: any;
  TotalAppointmentsData: any;
  TypesOfRecords: any;
  GenderDistribution: any;
}
const Display = (props: DisplayProps) => {
  return (
    <>
      <Grid
        container
        spacing={2}
        columns={16}
        columnGap={3}
        className="container"
      >
        <Grid item xs={5}>
          <Box flexGrow={1} textAlign={"center"}>
            <Typography>total revenue</Typography>
            <PieChart
              title="total revenue"
              series={[props.TotalRevenueData]}
              height={200}
            />
          </Box>
        </Grid>
        <Grid item xs={5}>
          <Box flexGrow={1} textAlign={"center"}>
            <Typography>total records</Typography>
            <PieChart
              title="total records"
              series={[props.TotalRecordsData]}
              height={200}
            />
          </Box>
        </Grid>
        <Grid item xs={5}>
          <Box flexGrow={1} textAlign={"center"}>
            <Typography>total appointments</Typography>
            <PieChart
              title="total appointments"
              series={[props.TotalAppointmentsData]}
              height={200}
            />
          </Box>
        </Grid>
        <Grid item xs={8}>
          <BarChart
            dataset={props.TypesOfRecords}
            xAxis={[{ scaleType: "band", dataKey: "clinc" }]}
            series={[
              { dataKey: "diagnostic_reports", label: "reports" },
              { dataKey: "prescriptions", label: "prescriptions" },
            ]}
            height={300}
          />
        </Grid>
        <Grid item xs={7}>
          <BarChart
            dataset={props.GenderDistribution}
            xAxis={[{ scaleType: "band", dataKey: "clinc" }]}
            series={[
              { dataKey: "diagnostic_reports", label: "reports" },
              { dataKey: "prescriptions", label: "prescriptions" },
            ]}
            height={300}
          />
        </Grid>
      </Grid>
    </>
  );
};
export default Display;

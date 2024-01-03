import React from "react";
import ClinicTitle from "../components/title/title";
import DevicesTable from "../components/table/table";
import ScheduleViwer from "../components/Grid/grid";
import ExaminationScreen from "../components/Examination/container";
import ClinicMange from "../components/table/ClincMange";
import Box from "@mui/material/Box";
import Tab from "@mui/material/Tab";
import Tabs from "@mui/material/Tabs";
import "./index.css";
import AppLayout from "../../../../core/components/AppLayout";

const PediatricClinicPortal = () => {
  const [value, setValue] = React.useState(0);
  const handleChange = (event: React.SyntheticEvent, newValue: number) => {
    setValue(newValue);
  };
  return (
    <>
      <AppLayout>
        <div className="Nav-Bar">
          <ClinicTitle />
          <Box sx={{ borderColor: "divider" }}>
            <Tabs
              value={value}
              onChange={handleChange}
              aria-label="basic tabs example"
            >
              <Tab label="Clinic Mange" />
              <Tab label="Schedule " />
              <Tab label="Examination" />
            </Tabs>
          </Box>
        </div>
        {value === 0 && <ClinicMange />}
        {value === 1 && <ScheduleViwer />}
        {value === 2 && <ExaminationScreen />}
      </AppLayout>
    </>
  );
};
export default PediatricClinicPortal;

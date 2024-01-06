import React from "react";
import ClinicTitle from "../components/title/title";
import ScheduleViwer from "../components/Grid/grid";
import ExaminationScreen from "../components/Examination/container";
import ClinicMange from "../components/table/ClincMange";
import Box from "@mui/material/Box";
import Tab from "@mui/material/Tab";
import Tabs from "@mui/material/Tabs";
import "./index.css";

const PediatricClinicPortal = () => {
  const [value, setValue] = React.useState(0);
  const [appointmentID, setAppointmentID] = React.useState("");
  const handleChange = (event: React.SyntheticEvent, newValue: number) => {
    setValue(newValue);
  };
  return (
    <>
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
          </Tabs>
        </Box>
      </div>
      {value === 0 && <ClinicMange />}
      {value === 1 && (
        <ScheduleViwer
          setValueOfScreen={setValue}
          setValueOfappointmentID={setAppointmentID}
        />
      )}
      {value === 2 && <ExaminationScreen appointmentID={appointmentID} />}
    </>
  );
};
export default PediatricClinicPortal;

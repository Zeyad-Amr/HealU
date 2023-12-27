import React from "react";
import ClinicTitle from "../components/title/title";
import DevicesTable from "../components/table/table";
import ScheduleViwer from "../components/Grid/grid";
import ExaminationScreen from "../components/Examination/container";
import ClinicMange from "../components/table/ClincMange";

const PediatricClinicPortal = () => {
  return (
    <>
      <ClinicTitle />
      <ExaminationScreen />

      {/* <ClinicMange /> */}

      {/* <ScheduleViwer /> */}
    </>
  );
};
export default PediatricClinicPortal;

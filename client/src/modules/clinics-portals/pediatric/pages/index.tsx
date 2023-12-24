import ClinicTitle from "../components/title/title";
import DevicesTable from "../components/table/table";
import ScheduleViwer from "../components/Grid/grid";
import ExaminationScreen from "../components/Examination/container";
import { useEffect, useState } from "react";
import { useAppDispatch } from "../../../../core/store/index";
import { useSelector } from "react-redux";
import { fetchDevices, DeviceState, AddDevice, device } from "../slices/pediatric-slice";




const PediatricClinicPortal = () => {
  
  
  return (
    <>
      <ClinicTitle />
      {/* <ExaminationScreen /> */}
      <DevicesTable />
      {/* <ScheduleViwer /> */}
    </>
  );
};
export default PediatricClinicPortal;

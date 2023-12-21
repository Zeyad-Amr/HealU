import ClinicTitle from "../components/title/title";
import DevicesTable from "../components/table/table";
import ScheduleViwer from "../components/Grid/grid";
import { useEffect, useState } from "react";
import { useAppDispatch } from "../../../../core/store/index";
import { useSelector } from "react-redux";
import { fetchDevices, DeviceState } from "../slices/pediatric-slice";



const PediatricClinicPortal = () => {
  const dispatch = useAppDispatch();
  const deviceState: DeviceState = useSelector((state: any) => state.devices);
  const [selectedDevices, setSelectedDevices] = useState<DeviceState>({} as DeviceState);
  useEffect(() => {
    dispatch(fetchDevices(deviceState.AllDevices));
    setSelectedDevices(deviceState);
  }, [deviceState])
  return (
    <>
      <ClinicTitle />
      <DevicesTable data={selectedDevices} />
      <ScheduleViwer />
    </>
  );
};
export default PediatricClinicPortal;

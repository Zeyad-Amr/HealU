import ClinicTitle from "../components/title/title";
import DevicesTable from "../components/table/table";
import ScheduleViwer from "../components/Grid/grid";
import ExaminationScreen from "../components/Examination/container";
import { useEffect, useState } from "react";
import { useAppDispatch } from "../../../../core/store/index";
import { useSelector } from "react-redux";
import { fetchDevices, DeviceState, AddDevice, device } from "../slices/pediatric-slice";




const PediatricClinicPortal = () => {
  const dispatch = useAppDispatch();
  const NewDevice = {
    "Devices":[
      {
      DName: "babywarmer",
      DType: "pure",
      DManufacturer: "GM",
      PurchaseDate: "10/10/2021",
      ExpiryDate: "20/10/2035",
      DStatus: "working",

    }]};
  const deviceState: DeviceState = useSelector((state: any) => state.devices);
  const [selectedDevices, setSelectedDevices] = useState<DeviceState>({} as DeviceState);
  useEffect(() => {
    dispatch(fetchDevices(deviceState.AllDevices));
    // dispatch(AddDevice(NewDevice));
    setSelectedDevices(deviceState);
  }, [deviceState])
  
  return (
    <>
      <ClinicTitle />
      <ExaminationScreen />
      {/* <DevicesTable data={selectedDevices} />
      <ScheduleViwer /> */}
    </>
  );
};
export default PediatricClinicPortal;

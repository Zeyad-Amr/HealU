import ClinicTitle from "../components/title/title";
import DevicesTable from "../components/table/table";
import ScheduleViwer from "../components/Grid/grid";
import ExaminationScreen from "../components/Examination/container";
import { useEffect, useState } from "react";
import { useAppDispatch } from "../../../../core/store/index";
import { useSelector } from "react-redux";
import PopUp from "../components/PopUp/Popup";
import ClinicMange from "../components/table/ClincMange";
import AddPrescreptionForm from "../components/Prescreption/prescreptionForm";
import AddDeviceForm from "../components/table/deviceForm";

const PediatricClinicPortal = () => {
  const [isModalOpen, setModalOpen] = useState(false);

  const openModal = () => setModalOpen(true);
  const closeModal = () => setModalOpen(false);

  return (
    <>
      <ClinicTitle />
      {/* <ExaminationScreen /> */}

      <ClinicMange />

      {/* <ScheduleViwer /> */}
    </>
  );
};
export default PediatricClinicPortal;

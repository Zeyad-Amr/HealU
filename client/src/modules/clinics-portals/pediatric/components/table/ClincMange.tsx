import React from "react";
import DevicesTable from "./table";
import AddDeviceForm from "./deviceForm";
import PopUp from "../PopUp/Popup";
import Button from "@mui/material/Button";

const ClinicMange = () => {
  const [isModalOpen, setModalOpen] = React.useState(false);

  const openModal = () => setModalOpen(true);
  const closeModal = () => setModalOpen(false);

  return (
    <>
      <div className="ClinicMangContainer">
        <DevicesTable />

        <Button className="AddDevice" variant="contained" onClick={openModal}>
          Add Device
        </Button>
      </div>

      <PopUp isOpen={isModalOpen} onClose={closeModal} title={"Prescreption"}>
        <div className="modal-body">
          <AddDeviceForm closeModal={closeModal} />
        </div>
      </PopUp>
    </>
  );
};

export default ClinicMange;

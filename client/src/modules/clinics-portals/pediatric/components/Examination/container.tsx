import React from "react";
import { useEffect } from "react";
import { useState } from "react";
import { Container } from "@mui/material";
import PatientSection from "./patient/patientData";
import AddPrescreptionForm from "./../Prescreption/prescreptionForm";
import AddTestsForm from "./../Tests/testsForm";
import AddServicesForm from "./../Services/serviceForm";
import Diagnosis from "./diagnosis";
import "./container.css";
import Button from "@mui/material/Button";
import PopUp from "../PopUp/Popup";
const ExaminationScreen = () => {
  const [isPrescriptionModalOpen, setPrescriptionModalOpen] = useState(false);
  const [isTestsModalOpen, setTestsModalOpen] = useState(false);
  const [isServicesModalOpen, setServicesModalOpen] = useState(false);

  const openPrescriptionModal = () => setPrescriptionModalOpen(true);
  const closePrescriptionModal = () => setPrescriptionModalOpen(false);

  const openTestsModal = () => setTestsModalOpen(true);
  const closeTestsModal = () => setTestsModalOpen(false);

  const openServicesModal = () => setServicesModalOpen(true);
  const closeServicesModal = () => setServicesModalOpen(false);

  return (
    <Container maxWidth="lg" className="container">
      <PatientSection />
      <Diagnosis />
      <div className="AddBtns">
        <Button fullWidth variant="contained" onClick={openPrescriptionModal}>
          Prescription
        </Button>
        <Button fullWidth variant="contained" onClick={openTestsModal}>
          test
        </Button>
        <Button fullWidth variant="contained" onClick={openServicesModal}>
          Services
        </Button>
      </div>
      <PopUp
        isOpen={isPrescriptionModalOpen}
        onClose={closePrescriptionModal}
        title={"Add Device"}
      >
        <div className="modal-body">
          <AddPrescreptionForm closeModal={closePrescriptionModal} />
        </div>
      </PopUp>

      <PopUp
        isOpen={isTestsModalOpen}
        onClose={closeTestsModal}
        title={"Tests"}
      >
        <div className="modal-body">
          <AddTestsForm closeModal={closeTestsModal} />
        </div>
      </PopUp>

      <PopUp
        isOpen={isServicesModalOpen}
        onClose={closeServicesModal}
        title={"Services"}
      >
        <div className="modal-body">
          <AddServicesForm closeModal={closeServicesModal} />
        </div>
      </PopUp>
    </Container>
  );
};

export default ExaminationScreen;

import React from "react";
import { useEffect } from "react";
import { useState } from "react";
import { Container } from "@mui/material";
import PatientSection from "./patient/patientData";
import AddPrescreptionForm, {
  PrescreptionData,
} from "./../Prescreption/prescreptionForm";
import AddTestsForm, { testsData } from "./../Tests/testsForm";
import AddServicesForm, { serviceData } from "./../Services/serviceForm";
import Diagnosis from "./diagnosis";
import "./container.css";
import Button from "@mui/material/Button";
import PopUp from "../PopUp/Popup";
import { diagnosisData } from "./diagnosis";
const ExaminationScreen = () => {
  const [dataFromDiagnosis, setDataFromDiagnosis] = useState<diagnosisData>(
    {} as diagnosisData
  );

  const [dataFromPrescreption, setDataFromPrescreption] =
    useState<PrescreptionData>({} as PrescreptionData);

  const [dataFromTests, setDataFromTests] = useState<testsData>({
    TestName: [],
  });

  const [dataFromServices, setDataFromServices] = useState<serviceData>({
    ServiceName: [],
  });

  const handleDataFromServices = (data: serviceData) => {
    setDataFromServices(data);
  };

  const handleDataFromDiagnosiss = (data: diagnosisData) => {
    setDataFromDiagnosis(data);
  };

  const handleDataFromPrescreption = (data: PrescreptionData) => {
    setDataFromPrescreption(data);
  };

  const handleDataFromTests = (data: testsData) => {
    setDataFromTests(data);
  };
  const handleDoneClick = () => {
    // Process data or send it wherever needed
    console.log("Diagnosis Data:", dataFromDiagnosis);
    console.log("Prescription Data:", dataFromPrescreption);
    console.log("Tests Data:", dataFromTests);
    console.log("Services Data:", dataFromServices);
  };

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
    <Container maxWidth="lg" className="ped-container">
      <PatientSection />
      <Diagnosis DataFromDiagnosis={handleDataFromDiagnosiss} />
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
        title={"Add Prescription"}
      >
        <div className="modal-body">
          <AddPrescreptionForm
            DataFromPrescreption={handleDataFromPrescreption}
            OnClose={closePrescriptionModal}
          />
        </div>
      </PopUp>

      <PopUp
        isOpen={isTestsModalOpen}
        onClose={closeTestsModal}
        title={"Tests"}
      >
        <div className="modal-body">
          <AddTestsForm
            DataFromTests={handleDataFromTests}
            OnClose={closeTestsModal}
          />
        </div>
      </PopUp>

      <PopUp
        isOpen={isServicesModalOpen}
        onClose={closeServicesModal}
        title={"Services"}
      >
        <div className="modal-body">
          <AddServicesForm
            DataFromservice={handleDataFromServices}
            OnClose={closeServicesModal}
          />
        </div>
      </PopUp>
      <div className="Donebtn">
        <Button variant="contained" onClick={handleDoneClick}>
          Done
        </Button>
      </div>
    </Container>
  );
};

export default ExaminationScreen;

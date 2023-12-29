import React from "react";
import { useEffect } from "react";
import { useState } from "react";
import { Container } from "@mui/material";
import PatientSection from "./patient/patientData";
import AddPrescreptionForm from "./../Prescreption/prescreptionForm";
import { drugData, prescreptionData } from "../../slices/prescreption-slice";
import AddTestsForm, { testsData } from "./../Tests/testsForm";
import AddServicesForm, { serviceData } from "./../Services/serviceForm";
import Diagnosis from "./diagnosis";
import "./container.css";
import Button from "@mui/material/Button";
import PopUp from "../PopUp/Popup";
import { diagnosisData } from "./diagnosis";
import Icon from "@mui/material/Icon";
import { useAppDispatch } from "../../../../../core/store";
import { AddPrescreptions } from "../../slices/prescreption-slice";
import { AddRecord, Record } from "../../slices/record-slice";
const ExaminationScreen = () => {
  const dispatch = useAppDispatch();
  const [prescreptionData, setPrescreptionData] = useState<prescreptionData>({
    AppointmentID: "658f2f080ac4f2704ae1a238",
    DoctorName: "Dr. Abram Gad",
    Diagnosis: "",
    ExtraNotes: "",
    Drugs: [],
  } as prescreptionData);

  const [recordData, setRecordData] = useState<Record>({
    AppointmentID: "658f2f080ac4f2704ae1a238",
    Weight: 0,
    Height: 0,
    ServicesDescription: "",
    RecommendedActionDescription: "",
    Vital: {
      BloodPressure: "",
      RespirationRate: "",
      HeartRate: "",
      DiabeticTest: "",
      SPO2: "",
    },
    Vaccines: [],
    EyeMeasurements: [],
    NutritionData: [],
  } as Record);

  const [dataFromDiagnosis, setDataFromDiagnosis] = useState<diagnosisData>(
    {} as diagnosisData
  );

  const [dataFromPrescreption, setDataFromPrescreption] = useState<drugData>(
    {} as drugData
  );

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
    setPrescreptionData((prevData) => ({
      ...prevData,
      Diagnosis: data.Diagnosis,
      ExtraNotes: data.ExtraNotes,
    }));
    setRecordData((prevData) => ({
      ...prevData,
      Weight: data.PatientWeight,
      Height: data.PatientHeight,
      RecommendedActionDescription: data.RecommendedActionDescription,
      Vital: {
        BloodPressure: data.BloodPressure,
        RespirationRate: data.RespirationRate,
        HeartRate: data.HeartRate,
        DiabeticTest: data.DiabeticTest,
        SPO2: data.SPO2,
      },
    }));
  };

  const handleDataFromPrescreption = (data: drugData) => {
    setDataFromPrescreption(data);
    setPrescreptionData((prevData) => ({
      ...prevData,
      Drugs: [data],
    }));
  };

  const handleDataFromTests = (data: testsData) => {
    setDataFromTests(data);
  };
  const handleDoneClick = () => {
    // Process data or send it wherever needed
    // console.log("Diagnosis Data:", dataFromDiagnosis);
    // console.log("Prescription Data:", dataFromPrescreption);
    // console.log("Tests Data:", dataFromTests);
    // console.log("Services Data:", dataFromServices);
    dispatch(AddRecord(recordData));
    dispatch(AddPrescreptions(prescreptionData));
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
    <Container maxWidth="lg" className="container">
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

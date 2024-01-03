// mainPage.tsx
import DiagnosisForm from "./diagnosis/DiagnosisForm";
import PopUpDropListButton from "./elements/PopUpDropListButton";
import styles from "../examination/examination.module.css";
import SubmitButton from "./elements/SubmitButton";
import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";

import React, { useRef, useState } from "react";
import ModalPopUp from "./elements/ModalPopUp";
import CustomTextArea from "../examination/elements/CustomTextArea";
import CustomMultiSelect from "../examination/elements/CustomMultiSelect";
import ItemList from "./elements/ItemList";
import { Stack } from "@mui/material";
import PrescriptionFrom from "./examinationForm/PrescriptionFrom";
import TestForm from "./examinationForm/TestForm";
import ServicesForm from "./examinationForm/ServicesForm";



let Report: { Report: string }[];
let Recommendations: { Recommendations: string }[];

const PatientExamination: React.FC = () => {
  // Modal stuff
  const [modalContent, setModalContent] = useState<React.ReactNode | null>(
    null
  );
  const [isModalOpen, setIsModalOpen] = useState(false);
  const openModal = (content: React.ReactNode) => {
    setModalContent(content);
    setIsModalOpen(true);
  };
  const handleCloseModal = () => {
    setModalContent(null);
    setIsModalOpen(false);
  };

  // Popup for prescription
  const handleAddPrescription = () => {
    openModal(<PrescriptionFrom />);
  };
  // handling prescription list state
  const [prescriptionList, setPrescriptionList] = useState<string[]>([]);

  const handleAddTest = () => {
    openModal(<TestForm />);
  };

  // Popup for services
  const handleAddServices = () => {
    openModal(
      <ServicesForm 
        onClose={() => {
          handleCloseModal();
        }}
      />
    );
  };
  

  return (
    <div>
      <DiagnosisForm />
      <Stack direction="row">
        <PopUpDropListButton
          label="Prescription"
          onClick={handleAddPrescription}
        />
        <PopUpDropListButton label="Tests" onClick={handleAddTest} />
        <PopUpDropListButton label="Services" onClick={handleAddServices} />
      </Stack>

      {/* <Stack direction='row' spacing={2}>
        <ItemList
          list={Drugs.map(
            (drug) =>
              `${drug.DrugName} - ${drug.DrugDose} - ${drug.DrugDuration}`
          )}
        ></ItemList>
        <ItemList
          list={MedicalTests.map((test) => `${test.TestDescription}`)}
        ></ItemList>
        <ItemList
          list={Services.map((service) => `${service.ServicesDescription}`)}
        ></ItemList>
      </Stack> */}

      <SubmitButton
        label="Done"
        onClick={() => console.log("Sending report...")}
      />

      <ModalPopUp isOpen={isModalOpen} onClose={handleCloseModal}>
        {modalContent}
      </ModalPopUp>
    </div>
  );
};

export default PatientExamination;

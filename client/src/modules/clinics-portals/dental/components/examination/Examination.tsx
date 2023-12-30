import DiagnosisForm from "../examination/diagnosis/DiagnosisForm";
import PopUpDropListButton from "../examination/elements/PopUpDropListButton";
import styles from "../examination/examination.module.css";
import SubmitButton from "../examination/elements/SubmitButton";

import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";
import Paper from "@mui/material/Paper";

import React, { useState } from "react";
import ModalPopUp from "./elements/ModalPopUp";
import CustomTextArea from "../examination/elements/CustomTextArea";
import { CustomMultiSelect } from "../form";

const dentalServices = [
  { label: "Teeth Whitening", value: 1 },
  { label: "Teeth Cleaning", value: 2 },
  { label: "Dental Implants", value: 3 },
  { label: "Dental Fillings", value: 4 },
  { label: "Dental Crowns", value: 5 },
  { label: "Dental Bridges", value: 6 },
  { label: "Dental Veneers", value: 7 },
  { label: "Dentures", value: 8 },
  { label: "Root Canal Treatment", value: 9 },
  { label: "Tooth Extraction", value: 10 },
  { label: "Braces", value: 11 },
  { label: "Invisalign", value: 12 },
  { label: "Sleep Apnea", value: 13 },
  { label: "TMJ Disorder", value: 14 },
  { label: "Wisdom Teeth Removal", value: 15 },
  { label: "Gum Surgery", value: 16 },
  { label: "Oral Cancer Screening", value: 17 },
  { label: "Dental Emergency", value: 18 },
  { label: "Other", value: 19 },
];
const dentalTests = [
  { label: "X-ray", value: 1 },
  { label: "Panorama", value: 2 },
];
const Examination: React.FC = () => {
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
    openModal(
      <div>
        <h2>Prescription</h2>
        <Box display="grid" gridTemplateColumns="repeat(12, 1fr)" gap={2}>
          <Box gridColumn="span 12" className={styles.input}>
            <CustomTextArea
              height={1}
              title="Drug Name"
              placeholder="Prescription"
              value=""
            ></CustomTextArea>
          </Box>
          <Box gridColumn="span 5" className={styles.input}>
            <CustomTextArea
              height={1}
              title="Dose"
              placeholder="Enter Dose"
              value=""
            ></CustomTextArea>
          </Box>
          <Box gridColumn="span 5" className={styles.input}>
            <CustomTextArea
              height={1}
              title="Time"
              placeholder="Enter Times"
              value=""
            ></CustomTextArea>
          </Box>

          <Box gridColumn="span 12" className={styles.input}>
            <CustomTextArea
              height={5}
              title="Notes"
              placeholder="Enter Notes"
              value=""
            ></CustomTextArea>
          </Box>
          <Box gridColumn="span 12" className={styles.input}>
            <SubmitButton label="Save" />
          </Box>
        </Box>
      </div>
    );
  };

  // Popup for test
  const [selectedTests, setSelectedTest] = useState([]);
  const handleTestChange = (event: any) => {
    setSelectedTest(event.target.value);
  };

  const handleAddTest = () => {
    openModal(
      <div>
        <Box display="grid" gridTemplateColumns="repeat(12, 1fr)" gap={2}>
          <Box gridColumn="span 12" className={styles.input}>
            <h2>Tests</h2>
            <CustomMultiSelect
              label="Select Test"
              options={dentalTests}
              selectedValues={selectedTests}
              onChange={handleTestChange}
            ></CustomMultiSelect>
          </Box>
          <Box gridColumn="span 12" className={styles.input}>
            <SubmitButton label="Save" />
          </Box>
        </Box>
      </div>
    );
  };

  // handling services select state
  const [selectedServices, setSelectedServices] = useState([]);
  const handleServiceChange = (event: any) => {
    setSelectedServices(event.target.value);
  };
  // Popup for services
  const handleAddServices = () => {
    openModal(
      <div>
        <Box display="grid" gridTemplateColumns="repeat(12, 1fr)" gap={2}>
          <Box gridColumn="span 12" className={styles.input}>
            <h2>Services</h2>
            <CustomMultiSelect
              label="Select Service"
              options={dentalServices}
              selectedValues={selectedServices}
              onChange={handleServiceChange}
            ></CustomMultiSelect>
          </Box>
          <Box gridColumn="span 12" className={styles.input}>
            <SubmitButton label="Save" />
          </Box>
        </Box>
      </div>
    );
  };

  return (
    <div>
      <DiagnosisForm />
      <div className={styles.row}>
        <PopUpDropListButton
          label="Prescription"
          onClick={handleAddPrescription}
        />
        <PopUpDropListButton label="Tests" onClick={handleAddTest} />
        <PopUpDropListButton label="Services" onClick={handleAddServices} />
      </div>
      <SubmitButton label="Done" />

      <ModalPopUp isOpen={isModalOpen} onClose={handleCloseModal}>
        {modalContent}
      </ModalPopUp>
    </div>
  );
};

export default Examination;

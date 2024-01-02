import DiagnosisForm from "./diagnosis/DiagnosisForm";
import PopUpDropListButton from "./elements/PopUpDropListButton";
import styles from "../examination/examination.module.css";
import SubmitButton from "./elements/SubmitButton";
import Box from "@mui/material/Box";
import React, { useState } from "react";
import ModalPopUp from "./elements/ModalPopUp";
import CustomTextArea from "../examination/elements/CustomTextArea";
import CustomMultiSelect from "../examination/elements/CustomMultiSelect";
import DrugList from "./elements/ItemList";

const dentalServices = [
  { label: "Teeth Whitening", value: 1 },
  { label: "Teeth Cleaning", value: 2 },
  { label: "Teeth Extraction", value: 3 },
  { label: "Veneers", value: 4 },
  { label: "Fillings", value: 5 },
  { label: "Crowns", value: 6 },
  { label: "Root Canal", value: 7 },
  { label: "Braces", value: 8 },
  { label: "Bonding", value: 9 },
  { label: "Dentures", value: 10 },
];
const dentalTests = [
  { label: "X-ray", value: 1 },
  { label: "Panorama", value: 2 },
];

const PatientExamination: React.FC = () => {
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

  const handleSubmitPrescription = () => {
    handleCloseModal();
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
            <SubmitButton label="Save" onClick={handleSubmitPrescription} />
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
            <SubmitButton label="Save" onClick={handleCloseModal} />
          </Box>
        </Box>
      </div>
    );
  };

  // handling services select state
  const [selectedServices, setSelectedServices] = useState<string[]>([]);
  const handleServiceChange = (event: any) => {
    const selectedValues = event.target.value as string[];
    setSelectedServices(selectedValues);
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
            <SubmitButton label="Save" onClick={handleCloseModal} />
          </Box>
        </Box>
      </div>
    );
  };

  // prescriptions drug items
  const drugs = [
    { name: "Drug 1", dosage: "1", time: "1" },
    { name: "Drug 2", dosage: "2", time: "2" },
  ];

  //

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
      <div className={styles.row}>
        <DrugList drugs={drugs}></DrugList>
        <DrugList drugs={drugs}></DrugList>
        <DrugList drugs={drugs}></DrugList>
      </div>
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

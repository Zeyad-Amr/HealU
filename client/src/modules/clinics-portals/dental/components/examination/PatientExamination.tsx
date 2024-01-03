//PatientExamination.tsx
import DiagnosisForm from "./diagnosis/DiagnosisForm";
import PopUpDropListButton from "./elements/PopUpDropListButton";
import SubmitButton from "./elements/SubmitButton";
import TextField from "@mui/material/TextField";

import ModalPopUp from "./elements/ModalPopUp";
import CustomTextArea from "../examination/elements/CustomTextArea";
import CustomMultiSelect from "../examination/elements/CustomMultiSelect";
import ItemList from "./elements/ItemList";

import React, { useRef, useState } from "react";
import Box from "@mui/material/Box";
import styles from "../examination/examination.module.css";

const dentalServices = [
  { label: "Teeth Whitening", value: "Teeth Whitening" },
  { label: "Teeth Cleaning", value: "Teeth Cleaning" },
  { label: "Teeth Extraction", value: "Teeth Extraction" },
  { label: "Veneers", value: "Veneers" },
  { label: "Fillings", value: "Fillings" },
  { label: "Crowns", value: "Crowns" },
  { label: "Root Canal", value: "Root Canal" },
  { label: "Braces", value: "Braces" },
  { label: "Bonding", value: "Bonding" },
  { label: "Dentures", value: "Dentures" },
];
const dentalTests = [
  { label: "X-ray", value: "X-ray" },
  { label: "Panorama", value: "Panorama" },
];

// User Input objects
let Drugs: { DrugName: string; DrugDuration: string; DrugDose: string }[] = [
  {
    DrugName: "Test1",
    DrugDuration: "15",
    DrugDose: "30",
  },
];
let MedicalTests: { TestDescription: string }[] = [
  { TestDescription: "Test1" },
];
let Services: { ServicesDescription: string }[] = [
  { ServicesDescription: "Service1" },
];

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

  // PRESCRIPTION STUFF BELOW ----------------------------------------------
  // update drug list
  const handleSubmitPrescription = () => {
    // add element to Drugs array of objects and cast ref as string
    Drugs.push({
      DrugName: drugName,
      DrugDuration: drugDuration,
      DrugDose: drugDose,
    });
    handlePrescriptionListUpdate();
    handleCloseModal();
  };

  // handling prescription list state
  const [prescriptionList, setPrescriptionList] = useState<string[]>([]);
  const handlePrescriptionListUpdate = () => {
    setPrescriptionList(Drugs.map((drug) => `${drug.DrugName} - ${drug.DrugDose} - ${drug.DrugDuration}`));
  };
  // State for drug name
  const [drugName, setDrugName] = useState("");
  const handleDrugNameChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setDrugName(event.target.value);
  };
  // state for drug dose
  const [drugDose, setDrugDose] = useState("");
  const handleDrugDoseChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setDrugDose(event.target.value);
  };
  // state for drug duration
  const [drugDuration, setDrugDuration] = useState("");
  const handleDrugDurationChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setDrugDuration(event.target.value);
  };

// Popup for prescription
const handleAddPrescription = () => {
  openModal(
    <div>
      <h2>Prescription</h2>
      <Box display="grid" gridTemplateColumns="repeat(12, 1fr)" gap={2}>
        <Box gridColumn="span 12" className={styles.input}>
          <TextField
            id="outlined-basic"
            label="Drug Name"
            variant="outlined"
            placeholder="Enter Drug Name"
            value={drugName}
            onChange={handleDrugNameChange}
          />
        </Box>
        <Box gridColumn="span 5" className={styles.input}>
          <TextField
            id="outlined-basic"
            label="Drug Dose"
            variant="outlined"
            placeholder="Enter Drug Dose"
            value={drugDose}
            onChange={handleDrugDoseChange}
          />
        </Box>
        <Box gridColumn="span 5" className={styles.input}>
          <TextField
            id="outlined-basic"
            label="Drug Duration"
            variant="outlined"
            placeholder="Enter Time"
            value={drugDuration}
            onChange={handleDrugDurationChange}
          />
        </Box>

        <Box gridColumn="span 12" className={styles.input}>
          <CustomTextArea
            height={5}
            title="Notes"
            placeholder="Enter Notes"
            value={" Notes"}
          ></CustomTextArea>
        </Box>
        <Box gridColumn="span 12" className={styles.input}>
          <SubmitButton label="Save" onClick={handleSubmitPrescription} />
        </Box>
      </Box>
    </div>
  );
};


  // TEST STUFF BELOW ----------------------------------------------
  // Popup for test
  const [selectedTests, setSelectedTest] = useState([]);
  const handleTestChange = (event: any) => {
    setSelectedTest(event.target.value);
  };

  const handleTestListUpdate = () => {
    setPrescriptionList([...prescriptionList]);
  };

  // update test list
  const handleSubmitTest = () => {
    handleCloseModal();
    // add each element as object to test array
    selectedTests.forEach((test: string) => {
      MedicalTests.push({ TestDescription: test });
    });
    handleTestListUpdate();
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
            <SubmitButton label="Save" onClick={handleSubmitTest} />
          </Box>
        </Box>
      </div>
    );
  };

  // SERVICE STUFF BELOW ----------------------------------------------
  // handling services select state
  const [selectedServices, setSelectedServices] = useState<string[]>([]);
  const handleServiceChange = (event: any) => {
    const selectedValues = event.target.value as string[];
    setSelectedServices(selectedValues);
  };

  const [serviceList, setServiceList] = useState<string[]>([]);
  // handling test list updates
  const handleServiceListUpdate = () => {
    setServiceList([...serviceList]);
  };
  // update service list
  const handleSubmitService = () => {
    handleCloseModal();
    // add each element as object to test array
    selectedServices.forEach((service: string) => {
      Services.push({ ServicesDescription: service });
    });
    handleServiceListUpdate();
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
            <SubmitButton label="Save" onClick={handleSubmitService} />
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
      <div className={styles.row}>
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

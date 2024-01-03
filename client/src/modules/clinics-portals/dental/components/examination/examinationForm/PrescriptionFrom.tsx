import React, { useState } from "react";
import { Box, TextField } from "@mui/material";
import styles from "../examination.module.css";
import CustomTextArea from "../elements/CustomTextArea";
import SubmitButton from "../elements/SubmitButton";


let Drugs: { DrugName: string; DrugDuration: string; DrugDose: string }[] = [
    {
      DrugName: "Test1",
      DrugDuration: "15",
      DrugDose: "30",
    },
];

const PrescriptionFrom = () => {
    const handlePrescriptionListUpdate = () => {
        // setPrescriptionList(Drugs.map((drug) => `${drug.DrugName}` as string));
      };
  // State for drug name
  const [drugName, setDrugName] = useState("");
  const handleDrugNameChange = (event: any) => {
    setDrugName(event.target.value);
  };
  // state for drug dose
  const [drugDose, setDrugDose] = useState("");
  const handleDrugDoseChange = (event: any) => {
    setDrugDose(event.target.value);
  };
  // state for drug duration
  const [drugDuration, setDrugDuration] = useState("");
  const handleDrugDurationChange = (event: any) => {
    setDrugDuration(event.target.value);
  };

  const handleSubmitPrescription = () => {
    // add element to Drugs array of objects and cast ref as string
    Drugs.push({
      DrugName: drugName,
      DrugDuration: drugDuration,
      DrugDose: drugDose,
    });
    handlePrescriptionListUpdate();
    // handleCloseModal();
  };

  return (
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
            label="Drug Dose"
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

export default PrescriptionFrom;

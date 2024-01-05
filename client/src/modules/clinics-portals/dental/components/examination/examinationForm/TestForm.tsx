import React, { useState } from "react";
import { Box } from "@mui/material";
import styles from "../examination.module.css";
import SubmitButton from "../elements/SubmitButton";
import CustomMultiSelect from "../elements/CustomMultiSelect";

let MedicalTests: { TestDescription: string }[] = [
  { TestDescription: "Test1" },
];

const dentalTests = [
  { label: "X-ray", value: "X-ray" },
  { label: "Panorama", value: "Panorama" },
];

const TestForm = () => {
  const [selectedTests, setSelectedTest] = useState([]);

  const handleTestChange = (event: any) => {
    setSelectedTest(event.target.value);
  };

  const handleTestListUpdate = () => {
    // setPrescriptionList([...prescriptionList]);
  };

  // update test list
  const handleSubmitTest = () => {
    // handleCloseModal();
    // add each element as object to test array
    selectedTests.forEach((test: string) => {
      MedicalTests.push({ TestDescription: test });
    });
    handleTestListUpdate();
  };
  return (
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

export default TestForm;

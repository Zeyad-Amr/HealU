import React, { useState } from "react";
import { Stack, Box } from "@mui/material";

import styles from "./HistoryBox.module.css";
import { useSelector } from "react-redux";
import { RootState } from "../../../../../../../core/store";

const HistoryBox = () => {
  // // Sample data for drugs, illnesses, and medical tests
  // const initialDrugs = ["Aspirin", "Ibuprofen", "Paracetamol"];
  // const initialIllnesses = ["Flu", "Common Cold", "Allergies"];
  // const initialMedicalTests = ["Blood Test", "X-Ray", "MRI"];
  // const initialOperations = [
  //   "Appendectomy",
  //   "Knee Replacement",
  //   "Cataract Surgery",
  // ];

  // // State to hold the data
  // const [drugs, setDrugs] = useState(initialDrugs);
  // const [illnesses, setIllnesses] = useState(initialIllnesses);
  // const [medicalTests, setMedicalTests] = useState(initialMedicalTests);
  // const [operations, setOperations] = useState(initialOperations);

  const ExamState = useSelector(
    (state: RootState) => state.examinationReducer.examination.medicalHistory
  );

  return (
    <Box className={styles.historyBox}>
      <Stack spacing={2}>
        <span className={styles.titleText}>History</span>

        <Stack direction="row" spacing={2} style={{ width: "100%" }}>
          <Box className={styles.subBox}>
            <span className={styles.titleText}>Drugs</span>
            <ul>
              {ExamState.Drugs.map((drug, index) => (
                <li className={styles.listText} key={index}>
                  {drug.DrugName}
                </li>
              ))}
            </ul>
          </Box>

          <Box className={styles.subBox}>
            <span className={styles.titleText}>Illnesses</span>
            <ul>
              {ExamState.Illnesses.map((illness, index) => (
                <li className={styles.listText} key={index}>
                  {illness.IllnessDescription}
                </li>
              ))}
            </ul>
          </Box>

          <Box className={styles.subBoxTwoColumns}>
            <div className={styles.column}>
              <span className={styles.titleText}>Medical Tests</span>
              <ul>
                {ExamState.MedicalTests.map((test, index) => (
                  <li className={styles.listText} key={index}>
                    {test.TestDescription}
                  </li>
                ))}
              </ul>
            </div>
            <div className={styles.column}>
              <span className={styles.titleText}>Operations</span>
              <ul className={styles.SeparateLine}>
                {ExamState.Operations.map((operation, index) => (
                  <li className={styles.listText} key={index}>
                    {operation.OperationName}
                  </li>
                ))}
              </ul>
            </div>
          </Box>
        </Stack>
      </Stack>
    </Box>
  );
};

export default HistoryBox;

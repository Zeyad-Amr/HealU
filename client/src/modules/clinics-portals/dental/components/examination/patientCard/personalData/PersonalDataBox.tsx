import React from "react";
import { Stack, Box } from "@mui/material";

import styles from "./PersonalDataBox.module.css";
import dayjs from "dayjs";
import { useSelector } from "react-redux";
import { RootState } from "../../../../../../../core/store";

const PersonalData: React.FC = () => {
  const getAge = (birthDate: string) => {
    const dateOfBirth = dayjs(birthDate);
    const today = dayjs();
    const age = today.diff(dateOfBirth, "year");
    return age;
  };

  const ExamState = useSelector((state: RootState) => state.examinationReducer);

  return (
    <Box className={styles.box_container}>
      <Stack spacing={2}>
        <span className={styles.titleText}>Personal Data</span>

        <span className={styles.labelText}>
          Name:{" "}
          <span className={styles.parameterText}>
            {ExamState.examination.patient.userName}
          </span>
        </span>
        <span className={styles.labelText}>
          Weight:{" "}
          <span className={styles.parameterText}>
            {ExamState.examination.patientRecord[-1].PatientWeight} kg
          </span>
        </span>
        <span className={styles.labelText}>
          Length:{" "}
          <span className={styles.parameterText}>
            {ExamState.examination.patientRecord[-1].PatientHeight} Cm
          </span>
        </span>
        <span className={styles.labelText}>
          Age:{" "}
          <span className={styles.parameterText}>
            {getAge(ExamState.examination.patient.dateOfBirth)}
          </span>
        </span>
        {/* Add more personal data fields as needed */}
      </Stack>
    </Box>
  );
};

export default PersonalData;

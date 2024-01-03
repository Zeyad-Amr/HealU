import PersonCard from "../components/examination/patientCard/PersonCard";
import PatientExamination from "../components/examination/PatientExamination";
import { Stack } from "@mui/material";
import styles from "../components/examination/examination.module.css";
import AppLayout from "../../../../core/components/AppLayout";

const DentalExaminationPage = () => {
  return (
    <>
      <AppLayout>
        <Stack spacing={1} className={styles.page}>
          <PersonCard />
          <PatientExamination />
        </Stack>
      </AppLayout>
    </>
  );
};
export default DentalExaminationPage;

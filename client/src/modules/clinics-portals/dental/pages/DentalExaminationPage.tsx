import NavBar from "../components/navBar/NavBar";
import PersonCard from "../components/examination/patientCard/PersonCard";
import PatientExamination from "../components/examination/PatientExamination";
import { Stack } from "@mui/material";
import styles from "../components/examination/examination.module.css";

const DentalExaminationPage = () => {
    return (
        <>
            <NavBar />
            <Stack spacing={1} className={styles.page}>
                <PersonCard />
                <PatientExamination />
            </Stack>

        </>
    );
};
export default DentalExaminationPage;

import NavBar from "../components/navBar/NavBar";
import PersonCard from "../components/examination/patientCard/PersonCard";
import PatientExamination from "../components/examination/PatientExamination";

const DentalExaminationPage = () => {
    return (
        <>
            <NavBar />
            <PersonCard />
            <PatientExamination />
        </>
    );
};
export default DentalExaminationPage;

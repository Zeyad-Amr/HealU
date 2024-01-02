import NavBar from "../components/navBar/NavBar";
import PersonCard from "../components/examination/patientCard/PersonCard";
import Patientxamination from "../components/examination/PatientExamination";

const ExaminationPage = () => {
  return (
    <>
      <NavBar />
      <PersonCard />
      <Patientxamination />
    </>
  );
};
export default ExaminationPage;

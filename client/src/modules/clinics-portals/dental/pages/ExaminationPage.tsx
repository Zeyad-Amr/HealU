import NavBar from "../components/navBar/NavBar";
import PersonCard from "../components/examination/patientCard/PersonCard";
import Examination from "../components/examination/Examination";
import { useEffect } from "react";
import { useParams } from "react-router-dom";

const ExaminationPage = () => {
  const { patientId } = useParams();
  useEffect(() => {
      console.log(patientId);
  }, [])
  
  return (
    <>
      <NavBar />
      <PersonCard />
      <Examination />
    </>
  );
};
export default ExaminationPage;

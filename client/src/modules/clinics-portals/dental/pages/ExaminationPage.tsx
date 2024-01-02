import NavBar from "../components/navBar/NavBar";
import PersonCard from "../components/examination/patientCard/PersonCard";
import Patientxamination from "../components/examination/Examination";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import {
  Examination,
  fetchExaminationByAppointmentID,
} from "../state/slices/examinationSlice";
import { RootState, useAppDispatch } from "../../../../core/store";
import { useSelector } from "react-redux";

const ExaminationPage = () => {
  const { appointmetId } = useParams();
  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(fetchExaminationByAppointmentID(appointmetId ?? ""));
  }, [dispatch]);

  return (
    <>
      <NavBar />
      <PersonCard />
      <Patientxamination />
    </>
  );
};
export default ExaminationPage;

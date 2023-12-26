import React from "react";
import { useEffect } from "react";
import { useState } from "react";
import { Container } from "@mui/material";
import PatientSection from "./patient/patientData";
import AddPrescreptionForm from "./../Prescreption/prescreptionForm";
import Diagnosis from "./diagnosis";
import "./container.css";
import Button from "@mui/material/Button";
import PopUp from "../PopUp/Popup";
const ExaminationScreen = () => {
  const [isModalOpen, setModalOpen] = React.useState(false);
  const openModal = () => setModalOpen(true);
  const closeModal = () => setModalOpen(false);
  return (
    <>
      <Container maxWidth="lg" className="container">
        <PatientSection />
        <Diagnosis />
        <Button onClick={openModal}>Pris</Button>
        <PopUp isOpen={isModalOpen} onClose={closeModal} title={"Add Divece"}>
          <div className="modal-body">
            <AddPrescreptionForm closeModal={closeModal} />
          </div>
        </PopUp>
      </Container>
    </>
  );
};
export default ExaminationScreen;

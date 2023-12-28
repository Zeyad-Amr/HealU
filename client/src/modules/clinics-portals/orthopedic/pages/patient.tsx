import { useState } from "react";
import ButtonComponent from "../components/button/button";
import AddSlotForm from "../components/form/addSlotForm";
import useFormVisibility from "../components/form/formVisibility";

const Patient = () => {
  const { isFormVisible, toggleFormVisibility } = useFormVisibility(false);
  const handleButtonClick = () => {
    toggleFormVisibility();
  };
  return (
    <div>
      <ButtonComponent
        classStyle="buttonPrescription"
        text="Prescription Form"
        onClick={() => handleButtonClick()}
      />
      <AddSlotForm
        isFormVisible={isFormVisible}
        toggleFormVisibility={toggleFormVisibility}
        formTitle="Prescription"
        label1="Drug Name"
        formStyle="prescriptionForm_formContainer"
        div1Style="prescriptionForm_div1"
        div2Style="prescriptionForm_div2"
        div3Style="prescriptionForm_div3"
        div4Style="prescriptionForm_div4"
        submitButtonStyle="submitButton"
        inputType="text"
        isIncluded={true}

      />
    </div>
  );
};

export default Patient;

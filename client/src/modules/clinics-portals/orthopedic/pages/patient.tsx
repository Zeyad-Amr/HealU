import { useState } from "react";
import BlockComponent3 from "../components/block3";
import BlockContainer from "../components/BlockContainer";
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
      <BlockContainer />
      <BlockComponent3/>
    
    <div>
      <ButtonComponent
        classStyle="buttonPrescription"
        text="Prescription"
        onClick={() => handleButtonClick()}
      />
      <ButtonComponent
        classStyle="buttonPrescription"
        text="Tests"
      />
      <ButtonComponent
        classStyle="buttonPrescription"
        text="Services"
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
    </div>
  );
};

export default Patient;

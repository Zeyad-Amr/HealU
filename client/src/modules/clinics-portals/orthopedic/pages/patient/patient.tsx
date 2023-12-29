import { useState } from "react";
import ButtonComponent from "../../components/button/button";
import AddSlotForm from "../../components/form/addSlotForm";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../../slices/combineReducers";
import { addSlotActions } from "../../slices/addSlotsSlice";

const Patient = () => {
  const isVisible = useSelector((state: RootState) => state.slots.isVisible);
  const dispatch = useDispatch();
  const handleButtonClick = () => {
    dispatch(addSlotActions.setFormVisibility(true));
  };
  return (
    <div>
      <ButtonComponent
        classStyle="buttonPrescription"
        text="Prescription Form"
        onClick={() => handleButtonClick()}
      />
      <AddSlotForm
        isFormVisible={isVisible}
        // toggleFormVisibility={toggleFormVisibility}
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

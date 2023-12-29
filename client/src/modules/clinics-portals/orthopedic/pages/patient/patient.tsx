import { useState } from "react";
import ButtonComponent from "../../components/button/button";
import AddSlotForm from "../../components/form/addSlotForm";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../../slices/combineReducers";
import { addSlotActions } from "../../slices/addSlotsSlice";
import BlockContainer from "../../components/block/blockContainer";

const Patient = () => {
  const isVisible = useSelector((state: RootState) => state.slots.isVisible);
  const dispatch = useDispatch();
  const handleButtonClick = () => {
    dispatch(addSlotActions.setFormVisibility(true));
  };
  return (
    <div>
      <div style={{ display: "flex" }}>
        <BlockContainer
          headerContent={"Block1"}
          content={"Paragraph1"}
          classStyle="block"
        />
        <BlockContainer
          headerContent={"Block2"}
          content={"Paragraph2"}
          classStyle="block2"
        />
      </div>
      <BlockContainer
        headerContent={"Block3"}
        content={"Paragraph3"}
        classStyle="block3"
      />
      <ButtonComponent
        classStyle="buttonPrescription"
        text="Prescription"
        onClick={() => handleButtonClick()}
      />
      <ButtonComponent classStyle="buttonPrescription" text="Tests" />
      <ButtonComponent classStyle="buttonPrescription" text="Services" />
      <AddSlotForm
        isFormVisible={isVisible}
        //toggleFormVisibility={toggleFormVisibility}
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

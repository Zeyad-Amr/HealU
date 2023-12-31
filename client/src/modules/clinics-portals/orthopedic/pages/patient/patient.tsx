import { useState } from "react";
import ButtonComponent from "../../components/button/button";
import AddSlotForm from "../../components/form/addSlotForm";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../../slices/combineReducers";
import { addSlotActions } from "../../slices/addSlotsSlice";
import BlockContainer from "../../components/block/blockContainer";
import MyContainer from "../../components/block2/blockContainer2";

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
          headerContent={"Personal Data"}
          content={""}
          classStyle="block"
        />
        <MyContainer
        headerContent={"History"}
        classStyle="block2"/>
      </div>
      <BlockContainer 
        headerContent={"Diagnoses"}
        content={""}
        classStyle="block3"/>
       <ButtonComponent
        classStyle="buttonPrescription"
        text="Prescription"
        onClick={() => handleButtonClick()}/>
      <ButtonComponent classStyle="buttonPrescription" text="Tests"   
       onClick={() => handleButtonClick()} 
       />
      <ButtonComponent classStyle="buttonPrescription" text="Services" 
      onClick={() => handleButtonClick()}
      />
      <div>
      <ButtonComponent
        classStyle="buttonDone"
        text="Done"
      />
      </div>
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

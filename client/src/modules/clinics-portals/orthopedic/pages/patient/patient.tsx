import { useState } from "react";
import ButtonComponent from "../../components/button/button";
import AddSlotForm from "../../components/form/addSlotForm";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../../slices/combineReducers";
import { addSlotActions } from "../../slices/addSlotsSlice";
import classes from "./pateint.module.css";
import BlockContainer from "../../components/block/blockContainer";



const Patient = () => {
  const isVisible = useSelector((state: RootState) => state.slots.isVisible);
  const dispatch = useDispatch();
  const handleButtonClick = () => {
    dispatch(addSlotActions.setFormVisibility(true));
  };


  return (
    <div className={classes.pageContainer}>
      <div className={classes.flexContainer}>
        <BlockContainer headerContent={"Personal Data"} classStyle="block" />
        <BlockContainer headerContent={"History"} classStyle=" " />
      </div>
      <div className={classes.container}>
        <BlockContainer headerContent={"Diagnoses"} classStyle="block3" />
        <ButtonComponent
          classStyle="buttonPrescription"
          textStyle="text"
          text="Prescription"
          onClick={() => handleButtonClick()}
          backgroundColor="#C3C3C3"
        />
        <ButtonComponent
          classStyle="buttonPrescription"
          text="Tests"
          textStyle="text"
          onClick={() => handleButtonClick()}
          backgroundColor="#C3C3C3"
        />
        <ButtonComponent
          type="button"
          classStyle="buttonPrescription"
          text="Services"
          textStyle="text"
          onClick={() => handleButtonClick()}
          backgroundColor="#C3C3C3"
        />
      </div>
      <div>
        <ButtonComponent classStyle="buttonDone" text="Done" />
      </div>
      <AddSlotForm
        isFormVisible={isVisible}
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

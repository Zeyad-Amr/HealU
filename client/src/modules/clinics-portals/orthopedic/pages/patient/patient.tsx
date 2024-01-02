import { useState } from "react";
import ButtonComponent from "../../components/button/button";
import AddSlotForm from "../../components/form/addSlotForm";
import Form from "../../components/form2/Form";
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
    
    
    </div>
  );
};

export default Patient;

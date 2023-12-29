// import { useState } from "react";
import ButtonComponent from "../../components/button/button";
import classes from "../../components/button/button.module.css";
import ClassNames from "./doctorSlot.module.css";
import AddSlotForm from "../../components/form/addSlotForm";
import SchedulesTable from "../../components/table/schedulesTable";
import DateComponent from "../../components/datePicker/datePicker";
import { addSlotActions, getSlots } from "../../slices/addSlotsSlice";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../../slices/combineReducers";

const DoctorsSlot = () => {
  const slots = useSelector((state: RootState) => state.slots.slots);
  const isVisible = useSelector((state: RootState) => state.slots.isVisible);
  const dispatch = useDispatch();
  const handleButtonClick = () => {
    dispatch(addSlotActions.setFormVisibility(true));
  };

  return (
    <div className={ClassNames.mainContainer}>
      <div className={ClassNames.container}>
        <DateComponent />
        <div className={classes.parent}>
          <ButtonComponent
            onClick={handleButtonClick}
            text="Create New Slot"
            classStyle="ButtonComponent"
            includeIcon={true}
          />
        </div>
      </div>

      <SchedulesTable schedules={slots} />
      <AddSlotForm
        isFormVisible={isVisible}
        // toggleFormVisibility={toggleFormVisibility}
        formTitle="Create New Slot"
        label1="Date"
        formStyle="addSlotForm_formContainer"
        div1Style="addSlotForm_div1"
        div2Style="addSlotForm_div2"
        submitButtonStyle="submitButton"
        inputType="select"
        isIncluded={false}
        onAddSlot={true}
      />
    </div>
  );
};
export default DoctorsSlot;

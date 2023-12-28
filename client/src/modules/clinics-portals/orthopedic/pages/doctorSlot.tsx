// import { useState } from "react";
import ButtonComponent from "../components/button/button";
import classes from "../components/button/button.module.css";
import ClassNames from "./doctorSlot.module.css";
import AddSlotForm from "../components/form/addSlotForm";
import SchedulesTable from "../components/table/schedulesTable";
import useFormVisibility from "../components/form/formVisibility";
import DateComponent from "../components/datePicker/datePicker";
import { getSlots } from "../slices/addSlotsSlice";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../slices/combineReducers";

const DoctorsSlot = () => {
  const { isFormVisible, toggleFormVisibility } = useFormVisibility(false);
  const slots = useSelector((state: RootState) => state.slots.slots);
  // const dispatch = useDispatch();
  // const selectedDate = useSelector(
  //   (state: RootState) => state.slots.selectedDate
  // );
  // const addSlot = () => {
  //   if (selectedDate ) {
  //     dispatch(getSlots(selectedDate) as any);
  //   }
  // };

  return (
    <div className={ClassNames.mainContainer}>
      <div className={ClassNames.container}>
        <DateComponent toggleFormVisibility={toggleFormVisibility} />
        <div className={classes.parent}>
          <ButtonComponent
            onClick={toggleFormVisibility}
            text="Create New Slot"
            classStyle="ButtonComponent"
            includeIcon={true}
          />
        </div>
      </div>

      <SchedulesTable schedules={slots} />
      <AddSlotForm
        isFormVisible={isFormVisible}
        toggleFormVisibility={toggleFormVisibility}
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

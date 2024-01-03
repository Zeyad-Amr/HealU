// import { useState } from "react";
import ButtonComponent from "../../components/button/button";
import classes from "../../components/button/button.module.css";
import ClassNames from "./doctorSlot.module.css"
import React, { useEffect } from "react";
import AddSlotForm from "../../components/form/addSlotForm";
import SchedulesTable from "../../components/table/schedulesTable";
import DateComponent from "../../components/datePicker/datePicker";
import { addSlotActions, getSlots } from "../../slices/addSlotsSlice";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../../slices/combineReducers";
const DoctorsSlot = () => {
  // const slots = useSelector((state: RootState) => state[$CombinedState].slots);
  const { slots, isVisible, date } = useSelector((state: any) => ({
    slots: state.rootReducer.slots.slots,
    date: state.rootReducer.slots.selectedDate,
    isVisible: state.rootReducer.slots.isVisible,
  }));
  const dispatch = useDispatch();
  const handleButtonClick = () => {
    dispatch(addSlotActions.setFormVisibility(true));
  };
  useEffect(() => {
    // Perform 'getSlots' after 'deleteSlot' (if needed)
    const fetchData = async () => {
      if (date) {
        await dispatch(getSlots(date) as any);
      }
    };
    fetchData();
  }, [dispatch]);
  return (
    <>
      <div className={ClassNames.container}>
        <DateComponent />
        <div className={classes.parent} style={{ left: "70%", top: "-70%" }}>
          <ButtonComponent
            onClick={handleButtonClick}
            text="Create New Slot"
            classStyle="ButtonComponent"
            includeIcon={true}
            color="white"
            fontSize="32px"
          />
        </div>
      </div>
      <SchedulesTable schedules={slots} />
      {/* < div className={classSlot.ddSlotForm_formContainer}> */}
      <AddSlotForm
        isFormVisible={isVisible}
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
    </>
  );
};
export default DoctorsSlot;

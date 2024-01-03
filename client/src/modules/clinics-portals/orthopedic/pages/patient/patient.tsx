import { useState } from "react";
import ButtonComponent from "../../components/button/button";
import AddSlotForm from "../../components/form/addSlotForm";
import SimpleForm from "../../components/form2/Form";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../../slices/combineReducers";
import { addSlotActions } from "../../slices/addSlotsSlice";
import classes from "./pateint.module.css";
import BlockContainer from "../../components/block/blockContainer";
import { useParams } from "react-router-dom";
import { patientActions } from "../../slices/patientSlice";
import { formActions } from "../../../../admin-portal/slices/form-slice";

const Patient = () => {
  const { id } = useParams();
  const parsedId = id ? parseInt(id, 10) : undefined;
  // const isVisible = useSelector(
  //   (state: any) => state.rootReducer.slots.isVisible
  // );
  const isPrescriptionVisible = useSelector(
    (state: any) => state.rootReducer.form.isPrescriptionVisible
  );
  const isTestsVisible = useSelector(
    (state: any) => state.rootReducer.form.isTestsVisible
  );
  const isServicesVisible = useSelector(
    (state: any) => state.rootReducer.form.isServicesVisible
  );

  const dispatch = useDispatch();
  const handleButtonClick = (isVisible: number) => {
    if (isVisible === 1)
      dispatch(formActions.setPrescriptionVisibility(!isPrescriptionVisible));
    else if (isVisible === 2) dispatch(formActions.setTestsVisibility(true));
    else if (isVisible === 3)
      dispatch(formActions.setServicesVisibility(!isServicesVisible));
  };

  return (
    <div className={classes.pageContainer}>
      <div className={classes.flexContainer}>
        <BlockContainer
          headerContent={"Personal Data"}
          classStyle="block"
          id={parsedId}
        />
        <BlockContainer
          headerContent={"History"}
          classStyle=" "
          id={parsedId}
        />
      </div>

      <BlockContainer
        headerContent={"Diagnoses"}
        classStyle="block3"
        id={parsedId}
      />
      <div style={{ marginLeft: "-72.5px", marginTop: "20px" }}>
        <ButtonComponent
          classStyle="buttonPrescription"
          textStyle="text"
          text="Prescription"
          onClick={() => handleButtonClick(1)}
          backgroundColor="#C3C3C3"
          marginRight="25px"
        />
        <ButtonComponent
          classStyle="buttonPrescription"
          text="Tests"
          textStyle="text"
          onClick={() => handleButtonClick(2)}
          backgroundColor="#C3C3C3"
          marginRight="25px"
        />
        <ButtonComponent
          type="button"
          classStyle="buttonPrescription"
          text="Services"
          textStyle="text"
          onClick={() => handleButtonClick(3)}
          backgroundColor="#C3C3C3"
          marginRight="25px"
        />
      </div>
      <div style={{ marginTop: "20px", marginLeft: "330px" }}>
        <ButtonComponent
          classStyle="buttonDone"
          text="Done"
          color="white"
          fontSize="32px"
        />
      </div>
      {isTestsVisible && (
        <SimpleForm formHeading="Tests" labelFieldName="yyy" />
      )}
      <AddSlotForm
        isFormVisible={isPrescriptionVisible}
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

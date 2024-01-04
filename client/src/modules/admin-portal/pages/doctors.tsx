import * as React from "react";
import TableComponent from "../components/table/table";
import ButtonComponent from "../../clinics-portals/orthopedic/components/button/button";
import classes from "../../clinics-portals/orthopedic/components/button/button.module.css";
import styles from "../../clinics-portals/orthopedic/pages/doctorSlot/doctorSlot.module.css";
import { useDispatch, useSelector } from "react-redux";
// import { doctorSliceActions } from "../slices/doctor-slice";
import AddForm from "../components/form/form";
import { formActions } from "../slices/form-slice";


const AddDoctor = () => {
  const dispatch = useDispatch();
  const isFormVisible = useSelector(
    (state: any) => state.rootReducer.form.isFormVisible
  );
  const isEditForm = useSelector((state: any) => state.rootReducer.form.isEdit);

  const handleButtonClick = () => {
    dispatch(formActions.setFormVisibility(!isFormVisible));
  };

  return (
    <div className={styles.mainContainer} style={{ display: "flex" }}>
      <div className={classes.parent}>
        <ButtonComponent
          onClick={handleButtonClick}
          text="Add Doctor"
          classStyle="ButtonComponent"
          includeIcon={true}
          color="white"
          fontSize="32px"
        />
      </div>
      {isEditForm ? (
        <AddForm formTitle={"Edit Doctor"} />
      ) : (
        <AddForm formTitle={"Add Doctor"} />
      )}
      <TableComponent />
    </div>
  );
};

export default AddDoctor;

import * as React from "react";
import TableComponent from "../components/table/table";
import ButtonComponent from "../../clinics-portals/orthopedic/components/button/button";
import classes from "../../clinics-portals/orthopedic/components/button/button.module.css";
import styles from "../../clinics-portals/orthopedic/pages/doctorSlot/doctorSlot.module.css";
import { useDispatch, useSelector } from "react-redux";
// import { doctorSliceActions } from "../slices/doctor-slice";
import AddForm from "../components/form/form";
import { RootState } from "../../clinics-portals/orthopedic/slices/combineReducers";
// import { FormState, formActions } from "../slices/form-slice";
import { useEffect } from "react";
import { useState } from "react";
import { formActions } from "../slices/form-slice";

// <div
//   className={styles.mainContainer}
//   style={{
//     justifyContent: "center",
//     alignItems: "center",
//     minHeight: "100vh",
//     fontFamily: "Roboto",
//     backgroundColor: "#f5f5f5",
//   }}
// >
//   <h2 className={styles.labelElement}> Hiii</h2>
//   <Grid
//     container
//     spacing={{ xs: 2, md: 3 }}
//     columns={{ xs: 4, sm: 8, md: 12 }}
//     justifyContent="center" // Center the Grid horizontally
//     alignItems="center" // Center the Grid vertically
//   >
//     {Array.from(Array(6)).map((_, index) => (
//       <Grid xs={1} sm={4} md={4} key={index} >
//         <div style={{ marginLeft: "20px" }}>
//           <h2>Grid item</h2>
//         </div>
//       </Grid>
//     ))}
//   </Grid>
// </div>
const AddDoctor = () => {
  const dispatch = useDispatch();
  const isFormVisible = useSelector(
    (state: RootState) => state.form.isFormVisible
  );
  const isEditForm = useSelector((state: RootState) => state.form.isEdit);

  const handleButtonClick = () => {
    dispatch(formActions.setFormVisibility(!isFormVisible));
  };

  return (
    <div className={styles.mainContainer} style={{ display: "flex" }}>
      <div className={classes.parent} style={{ marginLeft: "1850px" }}>
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

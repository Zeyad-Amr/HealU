import * as React from "react";
import Grid from "@mui/material/Grid"; // Grid version 1
import styles from "../../clinics-portals/orthopedic/components/form/addSlotForm.module.css";

const AddDoctor = () => {
  return (
    <div
      className={styles.mainContainer}
      style={{
        justifyContent: "center",
        alignItems: "center",
        minHeight: "100vh",
        fontFamily: "Roboto",
        backgroundColor: "#f5f5f5",
      }}
    >
      <h2 className={styles.labelElement}> Hiii</h2>
      <Grid
        container
        spacing={{ xs: 2, md: 3 }}
        columns={{ xs: 4, sm: 8, md: 12 }}
        justifyContent="center" // Center the Grid horizontally
        alignItems="center" // Center the Grid vertically
      >
        {Array.from(Array(6)).map((_, index) => (
          <Grid xs={1} sm={4} md={4} key={index} >
            <div style={{ marginLeft: "20px" }}>
              <h2>Grid item</h2>
            </div>
          </Grid>
        ))}
      </Grid>
    </div>
  );
};

export default AddDoctor;

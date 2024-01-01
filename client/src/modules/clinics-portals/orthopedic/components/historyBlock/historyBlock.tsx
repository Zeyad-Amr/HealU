import React from "react";
import classes from "./history.module.css";

interface HistoryBlockProbs {
  headerContent: string;
  classStyle: string;
}
const HistoryBlock: React.FC<HistoryBlockProbs> = ({
  headerContent,
  classStyle,
}) => {
  return (
    <div className={classes[classStyle as string]}>
      <h2>{headerContent}</h2>
      <div className={classes.innerContainer}>
        <div className={classes.customDiv}>
          <h2 className={classes.Header}>Drugs</h2>
          <div>
            <label>tttttt</label>
          </div>
          <div>
            <label>ttttt</label>
          </div>
          <div>
            <label>ttttt</label>
          </div>
        </div>
        <div className={classes.customDiv}>
          <h2 className={classes.Header}>{"Illnesses"}</h2>
          <div>
            <label htmlFor="name"> *</label>
          </div>
          <div>
            <label htmlFor="weight">*</label>
          </div>
        </div>
        <div className={classes.customDiv}>
          <h2 className={classes.Header}>{"operations and tests"}</h2>
          <div>
            <label htmlFor="name">*</label>
          </div>
          <div>
            <label htmlFor="weight">*</label>
          </div>
          <div>
            <label htmlFor="height">*</label>
          </div>
          <div>
            <label htmlFor="age">*</label>
          </div>
        </div>
      </div>
    </div>
  );
};

export default HistoryBlock;

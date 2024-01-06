import React from "react";
import classes from "./diagnosisBlock.module.css";

const DiagnosisBlock = ({
  headerContent,
  classStyle,
  id
}: {
  headerContent: string;
  classStyle?: string;
  id:number

}) => {
  return (
    <div className={classes[classStyle as string]}>
      <h1 className={classes.centeredHeader}>{headerContent}</h1>
      <div>
        <div className={classes.formField}>
          <h2 className={classes.Header}>{"Drugs"}</h2>
          <form className={classes.form}>
            <div>
              <label htmlFor="drug1">*</label>
              <input
                type="text"
                id="drug1"
                name="drug1"
                placeholder="Enter your 1st drug"
              />
            </div>
            <div>
              <label htmlFor="drug2">*</label>
              <input
                type="text"
                id="drug2"
                name="drug2"
                placeholder="Enter your 2nd drug"
              />
            </div>
            <div>
              <label htmlFor="drug3">*</label>
              <input
                type="text"
                id="drug3"
                name="drug3"
                placeholder="Enter your 3rd drug"
              />
            </div>
          </form>
        </div>
      </div>
      <div>
        <h2 className={classes.Header}>{"Illnesses"}</h2>
        <form>
          <div>
            <label htmlFor="name"> *</label>
            <input
              type="text"
              id="username"
              name="username"
              placeholder="Enter your name"
            />
          </div>

          <div>
            <label htmlFor="weight">*</label>
            <input
              type="text"
              id="weight"
              name="weight"
              placeholder="Enter your weight"
            />
          </div>
        </form>
      </div>
      <div>
        <h2 className={classes.Header}>{"operations and tests"}</h2>
        <form>
          <div>
            <label htmlFor="name">*</label>
            <input
              type="text"
              id="username"
              name="username"
              placeholder="Enter your name"
            />
          </div>

          <div>
            <label htmlFor="weight">*</label>
            <input
              type="text"
              id="weight"
              name="weight"
              placeholder="Enter your weight"
            />
          </div>
          <div>
            <label htmlFor="height">*</label>
            <input
              type="text"
              id="height"
              name="height"
              placeholder="Enter your height"
            />
          </div>
          <div>
            <label htmlFor="age">*</label>
            <input
              type="text"
              id="age"
              name="age"
              placeholder="Enter your age"
            />
          </div>
        </form>
      </div>
    </div>
  );
};

export default DiagnosisBlock;

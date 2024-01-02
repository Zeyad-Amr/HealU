import React, { useState, useRef, SetStateAction } from "react"

import styles from "./Form.module.css";
import { blue } from "@mui/material/colors";

interface FormProps {
  formHeading: string;
  labelFieldName: string;
}

const SimpleForm: React.FC<FormProps> = ({ formHeading, labelFieldName }) => {
  const [fieldValue, setFieldValue] = useState<string>('');

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setFieldValue(event.target.value);
  };

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    // Handle form submission logic here
    console.log('Form submitted with value:', fieldValue);
  };

  return (
    <div className={styles["my-form-container"]}>
      <div className={styles["header"]}>
      <h2 className={styles["my-form-heading"]}>{formHeading}</h2>
      <button className={styles["closeButton"]}>x</button>
      </div>
      <form onSubmit={handleSubmit} className={styles["form"]}>
        <label className={styles["my-form-label"]} >
          {labelFieldName}:
          </label>
          <input type="text" value={fieldValue} onChange={handleChange} className={styles["my-form-input"]} />
          
        <button type="submit" className={styles["my-form-button"]}>
          Save
        </button>
      </form>
    </div>
  );
};

export default SimpleForm;

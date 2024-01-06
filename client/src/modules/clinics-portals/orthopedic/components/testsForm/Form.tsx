import React, { useState } from "react";

import styles from "./Form.module.css";
import { useDispatch, useSelector } from "react-redux";
import { formActions } from "../../../../admin-portal/slices/form-slice";

interface FormProps {
  formHeading: string;
  labelFieldName: string;
  patientId?: number | undefined;
}

const SimpleForm: React.FC<FormProps> = ({
  formHeading,
  labelFieldName,
  patientId,
}) => {
  const [fieldValue, setFieldValue] = useState<string>("");
  const isVisible = useSelector(
    (state: any) => state.rootReducer.form.isTestsVisible
  );

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setFieldValue(event.target.value);
  };

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    // Handle form submission logic here
  };
  const dispatch = useDispatch();

  return (
    <>
      {isVisible && (
        <div className={styles["my-form-container"]}>
          <div className={styles["header"]}>
            <h2 className={styles["my-form-heading"]}>{formHeading}</h2>
            <button
              className={styles["closeButton"]}
              onClick={() => dispatch(formActions.setTestsVisibility(false))}
            >
              x
            </button>
          </div>
          <form onSubmit={handleSubmit} className={styles["form"]}>
            <label className={styles["my-form-label"]}>{labelFieldName}:</label>
            <input
              type="text"
              value={fieldValue}
              onChange={handleChange}
              className={styles["my-form-input"]}
            />

            <button type="submit" className={styles["my-form-button"]}>
              Save
            </button>
          </form>
        </div>
      )}
    </>
  );
};

export default SimpleForm;

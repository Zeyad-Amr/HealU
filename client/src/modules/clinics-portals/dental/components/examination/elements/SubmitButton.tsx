import React from "react";
import styles from "../examination.module.css";

interface SubmitButtonProps {
  label: string;
}
const SubmitButton = ({ label }: SubmitButtonProps) => {
  return (
    <div className={styles.buttonContainer}>
      <button className={styles["gradient-button"]}>{label}</button>
    </div>
  );
};

export default SubmitButton;

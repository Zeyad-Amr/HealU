import React from "react";
import styles from "../examination.module.css";

interface SubmitButtonProps {
  label: string;
  onClick?: () => void; // added prop
}
const SubmitButton = ({ label, onClick }: SubmitButtonProps) => {
  return (
    <div className={styles.buttonContainer}>
      <button className={styles["gradient-button"]} onClick={onClick}>
        {label}
      </button>{" "}
      {/* added onClick */}
    </div>
  );
};

export default SubmitButton;

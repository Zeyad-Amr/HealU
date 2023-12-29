import React from "react";
// import addIcon from "../../../imgs/add_vector.svg";
import styles from "../examination.module.css";

interface PopUpDropListButtonProps {
  label: string;
}

const PopUpDropListButton = ({ label }: PopUpDropListButtonProps) => {
  return (
    <div className={styles.PopUpDropListButton}>
      {label}
      {"+"}
    </div>
  );
};

export default PopUpDropListButton;

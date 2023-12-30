import React from "react";
// import addIcon from "../../../imgs/add_vector.svg";
import styles from "../examination.module.css";
import AddCircleOutlineIcon from "@mui/icons-material/AddCircleOutline";

interface PopUpDropListButtonProps {
  label: string;
  onClick: () => void; // Define the type for the callback function
}

const PopUpDropListButton = ({ label, onClick }: PopUpDropListButtonProps) => {
  return (
    <div className={styles.PopUpDropListButton} onClick={onClick}>
      {label}
      {<AddCircleOutlineIcon />}
    </div>
  );
};

export default PopUpDropListButton;

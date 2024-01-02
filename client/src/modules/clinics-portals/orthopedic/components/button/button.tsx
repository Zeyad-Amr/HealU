import React, { MouseEvent, FormEvent } from "react";
import Button from "@mui/material/Button";
import classes from "./button.module.css";
import AddCircleOutlineIcon from "@mui/icons-material/AddCircleOutline";
import { makeStyles } from "@mui/styles"; // Import makeStyles from @mui/styles

interface ButtonProps {
  onClick?: (
    e: MouseEvent<HTMLButtonElement> | FormEvent<HTMLFormElement>
  ) => void;
  text: string;
  type?: "button" | "submit" | "reset" | undefined;
  classStyle?: string;
  textStyle?: string;
  includeIcon?: boolean;
  customStyles?: string;
  backgroundColor?: string;
  color?: string;
  fontSize?: string;
  marginRight?: string;
}

const useStyles = makeStyles({
  customButton: {
    backgroundColor: "#C3C3C3",
    // Add any other styles you need
  },
});

const ButtonComponent: React.FC<ButtonProps> = ({
  onClick,
  text,
  classStyle,
  textStyle,
  type,
  color,
  backgroundColor,
  includeIcon = false,
  fontSize,
  marginRight
}) => {
  return (
    <Button
      onClick={(
        e: MouseEvent<HTMLButtonElement> | FormEvent<HTMLFormElement>
      ) => onClick && onClick(e)}
      type={type}
      style={{ backgroundColor: backgroundColor, marginRight:`${marginRight}` }}
      className={classes[classStyle as string]}
      startIcon={
        includeIcon && (
          <AddCircleOutlineIcon
            style={{ width: 42, height: 42, color: "white" }}
          />
        )
      }
    >
      <span className={classes[textStyle as string]} style={{textTransform:"none", fontSize:`${fontSize}`, color:`${color}`}}> {text} </span>
    </Button>
  );
};

export default ButtonComponent;

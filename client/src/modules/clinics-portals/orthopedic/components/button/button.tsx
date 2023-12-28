import React, { MouseEvent, FormEvent } from "react";
import Button from "@mui/material/Button";
import classes from "./button.module.css";
import AddCircleOutlineIcon from "@mui/icons-material/AddCircleOutline";

interface ButtonProps {
  onClick?: (
    e: MouseEvent<HTMLButtonElement> | FormEvent<HTMLFormElement>
  ) => void;
  text: string;
  type?: "button" | "submit" | "reset" | undefined;
  classStyle?: string;
  textStyle?: string;
  includeIcon?: boolean;
}

const ButtonComponent: React.FC<ButtonProps> = ({
  onClick,
  text,
  classStyle,
  type,
  includeIcon = false,
}) => {
  return (
    <Button
      onClick={(
        e: MouseEvent<HTMLButtonElement> | FormEvent<HTMLFormElement>
      ) => onClick && onClick(e)}
      type={type}
      startIcon={
        includeIcon && (
          <AddCircleOutlineIcon
            style={{ width: 42, height: 42, color: "white" }}
          />
        )
      }
    >
      <span className={classes[classStyle as string]}> {text} </span>
    </Button>
  );
};

export default ButtonComponent;

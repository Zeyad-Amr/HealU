import React, { MouseEvent, FormEvent } from "react";
import Button from "@mui/material/Button";
import classes from "./button.module.css";

interface ButtonProps {
  onClick?: (
    e: MouseEvent<HTMLButtonElement> | FormEvent<HTMLFormElement>
  ) => void;
  text: string;
  type?: "button" | "submit" | "reset" | undefined;
  classStyle?: string;
  textStyle?: string;
}

const ButtonComponent: React.FC<ButtonProps> = ({
  onClick,
  text,
  classStyle,
  type,
}) => {
  return (
    <Button
      onClick={(
        e: MouseEvent<HTMLButtonElement> | FormEvent<HTMLFormElement>
      ) => onClick && onClick(e)}
      type={type}
    >
      <span className={classes[classStyle as string]}> {text} </span>
    </Button>
  );
};

export default ButtonComponent;
